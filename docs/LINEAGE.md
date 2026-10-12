# Lineage

## What this was

A foundation-first source tree for a schooling portal: an Express API, Firebase token checks, role names for student, parent, teacher, and admin, curriculum record schemas, a Terraform logging bucket, and placeholder screens. Early wording tied the project to a state program and a grade-band label. That wording is removed from this public snapshot.

## What it became

The public source snapshot of the GHS Learning Platform. The running schooling portal is a separate site. This repository documents the foundation and does not deploy it.

## Links

- Live product: https://ghs.nonartificialsi.com
- Portfolio: https://www.nonartificialsi.com

## History rewrite (Andrew)

gitleaks 8.30.1 scanned this public snapshot with `gitleaks git --log-opts=--all --redact=100` on 12 October 2026. The scan covered 20 commits and about 562 KB, and it reported no leaks. No service-account file, private key, or other key-like file is tracked at HEAD. `.env` is gitignored. This change does not rewrite history.

If a service-account key shows up outside this snapshot (another remote, a fork, or a backup), rotate that key and rewrite the history that contains it. There is nothing at HEAD to untrack.

## Brand

The README banners are composed from the published MaQkrs brand kit v1. The files used are the day and night pixel wordmarks and the Course Tracker sprite, pasted at their native pixel size on white and on navy `#182048`, with a leaf-green `#3F9E40` rule. The kit zip SHA-256 is `8307ca0e2a9dd3b230f90804bf65b906706ea6a0bab11514a50814c382a9c777`. Pages in this snapshot do not request the kit from the network.
