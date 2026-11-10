---
title: Mill Cert Checker
order: 1
headline: Reads steel mill certificates, checks them against the order, and sends the exceptions to a person.
summary: Supplier certificates in any layout go in. A completed inspection report comes out, and anything questionable waits for a reviewer instead of being guessed.
thumb: mill-cert-dashboard.jpg
thumbAlt: "The dashboard: nine certificates read, four passed automatically, five waiting on a person, with the reasons and a breakdown by job"
stack:
  - Node.js
  - Plain JavaScript
  - Claude Code (reads the documents)
  - Automated tests
demo: /demos/mill-cert-checker/
code: https://github.com/JacksonSearle/mill-cert-checker
---

*A prototype built with AI coding tools.*

## The problem

When a fabricator receives steel, it comes with a test certificate from the mill listing the steel's chemistry and strength. Every mill lays its certificate out differently, and some use metric units. Someone has to read each one, confirm the numbers meet the specification that was ordered, and fill in an inspection report. It is slow and repetitive, and a missed number is expensive.

## The result

A working demo that does the routine part and hands the rest to a person. It reads certificates from four different layouts, including a scanned one, converts everything to one set of units, checks each value against the specification and the purchase order, and fills in the inspection report.

On the nine sample certificates, four pass automatically and five are held for a reviewer, each with the reason in plain words: carbon over the limit, a blank heat number, the wrong grade for the order, strength below the minimum, and a scan that needs to be confirmed by eye.

This is a demonstration on sample data that I made up, and the specification limits in it are illustrative.

{% shot "mill-cert-review.jpg", "The review screen: the original certificate on the left, and on the right two flagged items with reasons, the unit conversions, and every check with its required value" %}

## How it works

1. **Read.** An AI model reads each certificate and copies every value exactly as printed. It is not allowed to convert, interpret or fill in a blank.
2. **Cross-check the reading.** Each value that was read must appear, character for character, in the document's own text. If it doesn't, it is flagged. A scan has no text to check against, so it always goes to a person.
3. **Standardize.** Ordinary code converts units and names, so "540 MPa" and "78.3 ksi" can be compared, and three ways of writing the same grade become one.
4. **Check.** Code compares each value with the limits for the grade that was ordered, and confirms the order number, grade and thickness match the purchase order.
5. **Review.** A reviewer sees the original beside the checks. They can correct a value, which is re-checked on the spot, then approve or reject with a note. Every action is logged.
6. **Report.** The inspection report is filled in from the record, with the result and who reviewed it.

The reading is done by AI because layouts vary. The pass-or-flag decision is done by tested code because it has to be exact and repeatable. The software never rejects material and never approves a flagged certificate. Only a person does.

{% shot "mill-cert-scan.jpg", "A scanned certificate held for review because its values could not be cross-checked automatically" %}

{% shot "mill-cert-form.jpg", "The receiving inspection report filled in from a certificate: required and reported values, result and disposition" %}
