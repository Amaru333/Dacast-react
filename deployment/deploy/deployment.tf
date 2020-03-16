provider "aws" {
    region = "us-east-1"
}

terraform {
    backend "s3" {
        region = "us-east-1"
    }
}

variable "domain_name" {
    type = "string"
}

variable "env_name_client" {
    type = "string"
}

variable "env_name_admin" {
    type = "string"
}

locals {
    s3_origin_id = "${var.env_name_client}-origin"
}

data "aws_acm_certificate" "certificate" {
    domain = "*.${var.domain_name}"
}

data "aws_route53_zone" "domain_zone" {
    name = "${var.domain_name}"
}

data "aws_iam_policy_document" "s3_policy" {
    statement {
        actions   = ["s3:GetObject"]
        resources = ["${aws_s3_bucket.static_storage_s3.arn}/*"]

        principals {
            type        = "AWS"
            identifiers = ["${aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn}"]
        }
    }

    statement {
        actions   = ["s3:ListBucket"]
        resources = ["${aws_s3_bucket.static_storage_s3.arn}"]

        principals {
            type        = "AWS"
            identifiers = ["${aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn}"]
        }
    }
}

output "s3" {
    value = "${aws_s3_bucket.static_storage_s3.id}"
}

output "distribution_id_client" {
    value = "${aws_cloudfront_distribution.s3_distribution_client.id}"
}

output "base_url" {
    value = "${aws_route53_record.distribution_domain_client.fqdn}"
}

resource "aws_route53_record" "distribution_domain_client" {
    zone_id = "${data.aws_route53_zone.domain_zone.id}"
    name = "${var.env_name_client}.${var.domain_name}"
    type = "CNAME"
    ttl = "300"
    records = ["${aws_cloudfront_distribution.s3_distribution_client.domain_name}"]
}

resource "aws_route53_record" "distribution_domain_admin" {
    zone_id = "${data.aws_route53_zone.domain_zone.id}"
    name = "${var.env_name_admin}.${var.domain_name}"
    type = "CNAME"
    ttl = "300"
    records = ["${aws_cloudfront_distribution.s3_distribution_client.domain_name}"]
}

resource "aws_s3_bucket" "static_storage_s3" {
    bucket = "${var.env_name_client}-backoffice-static-files"
    acl = "private"

    tags = {
        Name = "${var.env_name_client}-backoffice-static-files"
        project = "dacast-backoffice"
        detail = "${var.env_name_client}-dacast-backoffice"
    }

    cors_rule {
        allowed_headers = ["*"]
        allowed_methods = ["GET"]
        allowed_origins = ["*"]
        max_age_seconds = 3000
    }
}

resource "aws_s3_bucket_policy" "static_storage_s3_policy" {
  bucket = "${aws_s3_bucket.static_storage_s3.id}"
  policy = "${data.aws_iam_policy_document.s3_policy.json}"
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
    comment = "access identity or the bucket distibution of the dacast-backoffice"
}

resource "aws_cloudfront_distribution" "s3_distribution_client" {
    origin {
        domain_name = "${aws_s3_bucket.static_storage_s3.bucket_regional_domain_name}"
        origin_id = "${local.s3_origin_id}"

        s3_origin_config {
            origin_access_identity = "${aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path}"
        }
    }

    enabled = true
    default_root_object = "index.html"
    is_ipv6_enabled = true
    comment = "distribution for the dacast backoffice assets"
    aliases = ["${var.env_name_client}.${var.domain_name}", "${var.env_name_admin}.${var.domain_name}"]

    default_cache_behavior {
        allowed_methods = ["GET", "HEAD", "OPTIONS"]
        cached_methods = ["GET", "HEAD"]
        target_origin_id = "${local.s3_origin_id}"

        forwarded_values {
            query_string = false

            cookies { 
                forward = "none"
            }
        }

        viewer_protocol_policy = "redirect-to-https"
        min_ttl = 0
        default_ttl = 86400
        max_ttl = 31536000
        compress = true

        lambda_function_association {
            event_type = "origin-response"
            lambda_arn = "${aws_lambda_function.redirect_lambda.qualified_arn}"
            include_body = false
        }
        lambda_function_association {
            event_type = "viewer-request"
            lambda_arn = "${aws_lambda_function.admin_lambda.qualified_arn}"
            include_body = false
        }
    }

    price_class = "PriceClass_All"

    tags = {
        project = "dacast-backoffice"
        detail = "${var.env_name_client}-dacast-backoffice-client"
    }

    viewer_certificate {
        acm_certificate_arn = "${data.aws_acm_certificate.certificate.arn}"
        ssl_support_method = "sni-only"
    }

    restrictions {
        geo_restriction {
            restriction_type = "none"
        }
    }
}

resource "aws_lambda_function" "redirect_lambda" {
    filename = "redirect.zip"
    function_name = "${var.env_name_client}-dacast-backoffice-redirect"
    role = "${aws_iam_role.iam_for_lambda.arn}"
    handler = "redirect.handler"
    runtime = "nodejs12.x"
    // enable versioning
    publish = true

    source_code_hash = "${filebase64sha256("redirect.zip")}"
}

resource "aws_lambda_function" "admin_lambda" {
    filename = "admin.zip"
    function_name = "${var.env_name_client}-dacast-backoffice-admin"
    role = "${aws_iam_role.iam_for_lambda.arn}"
    handler = "admin.handler"
    runtime = "nodejs12.x"
    // enable versioning
    publish = true

    source_code_hash = "${filebase64sha256("admin.zip")}"
}

resource "aws_iam_role" "iam_for_lambda" {
    name = "${var.env_name_client}-dacast-backoffice-redirect-role"

    assume_role_policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "sts:AssumeRole",
            "Principal": {
                "Service": ["lambda.amazonaws.com", "edgelambda.amazonaws.com"]
            },
            "Effect": "Allow",
            "Sid": ""
        }
    ]
}
    EOF
}

// resource "aws_iam_role_policy" "iam_for_lambda_role_policy" {
//   role = "${aws_iam_role.iam_for_lambda.name}"

//   policy = <<POLICY
// {
//     "Version": "2012-10-17",
//     "Statement": [
//         {
//             "Effect": "Allow",
//             "Resource": [
//                 "*"
//             ],
//             "Action": [
//                 "logs:CreateLogGroup",
//                 "logs:CreateLogStream",
//                 "logs:PutLogEvents"
//             ]
//         }
//     ]
// }
// POLICY
// }