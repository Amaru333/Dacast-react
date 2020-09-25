provider "aws" {
    region = "us-east-1"
}

terraform {
    backend "s3" {
        region = "us-east-1"
    }
}

variable "codebuild_project_name" {
    type = "string"
}

resource "aws_codebuild_project" "backoffice_build_project" {
    name = "${var.codebuild_project_name}"
    description = "deploy any environment of the dacast backoffice"
    service_role = "${aws_iam_role.backoffice_build_role.arn}"

    artifacts {
        type = "NO_ARTIFACTS"
    }

    environment {
        compute_type = "BUILD_GENERAL1_SMALL"
        image = "aws/codebuild/standard:4.0"
        type = "LINUX_CONTAINER"
        privileged_mode = false
    }

    source {
        type = "NO_SOURCE"
        buildspec = "${file("${path.module}/buildspec.yml")}"
    }
}

resource "aws_iam_role" "backoffice_build_role" {
  name = "dacast-backoffice-build-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "backoffice_build_role_policy" {
  role = "${aws_iam_role.backoffice_build_role.name}"

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Resource": [
        "*"
      ],
      "Action": [
        "*"
      ]
    }
  ]
}
POLICY
}