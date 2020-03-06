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

variable "env_name" {
    type = "string"
}

locals {
    s3_origin_id = "${var.env_name}-origin"
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

output "distribution_id" {
    value = "${aws_cloudfront_distribution.s3_distribution.id}"
}

output "base_url" {
    value = "${aws_route53_record.distribution_domain.fqdn}"
}

resource "aws_route53_record" "distribution_domain" {
    zone_id = "${data.aws_route53_zone.domain_zone.id}"
    name = "${var.env_name}.${var.domain_name}"
    type = "CNAME"
    ttl = "300"
    records = ["${aws_cloudfront_distribution.s3_distribution.domain_name}"]
}

resource "aws_s3_bucket" "static_storage_s3" {
    bucket = "${var.env_name}-backoffice-static-files"
    acl = "private"

    tags = {
        Name = "${var.env_name}-backoffice-static-files"
        project = "dacast-backoffice"
        detail = "${var.env_name}-dacast-backoffice"
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

resource "aws_cloudfront_distribution" "s3_distribution" {
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
    aliases = ["${var.env_name}.${var.domain_name}"]

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
    }

    price_class = "PriceClass_All"

    tags = {
        project = "dacast-backoffice"
        detail = "${var.env_name}-dacast-backoffice"
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