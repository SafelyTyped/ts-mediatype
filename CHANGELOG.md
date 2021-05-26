# CHANGELOG

## Introduction

This CHANGELOG tells you:

* when a release was made
* what is in each release

It also tells you what changes have been completed, and will be included in the next tagged release.

For each release, changes are grouped under these headings:

* _Backwards-Compatibility Breaks_: a list of any backwards-compatibility breaks
* _New_: a list of new features. If the feature came from a contributor via a PR, make sure you link to the PR and give them a mention here.
* _Fixes_: a list of bugs that have been fixed. If there's an issue for the bug, make sure you link to the GitHub issue here.
* _Dependencies_: a list of dependencies that have been added / updated / removed.
* _Tools_: a list of bundled tools that have been added / updated / removed.

## develop branch

The following changes have been completed, and will be included in the next tagged release.

### Dependencies

* Upgraded all dependencies to the latest version

## v0.1.0

Released Saturday, 20th June 2020.

### New

* ContentType
  - added isContentTypeData()
  - added makeContentType()
  - added mustBeContentTypeData()
  - added validateContentTypeData()
* Errors
  - added MediaTypeRegexIsBrokenError
* MediaType
  - added MediaType()
  - added makeMediaType()
  - added MakeMediaTypeOptions
  - added MAKE_MEDIA_TYPE_DEFAULT_OPTIONS
  - added MAKE_MEDIA_TYPE_DEFAULT_FN_OPTS
* MediaTypeData
  - added isMediaTypeData()
  - added makeMediaTypeDataFromMediaTypeParts()
  - added mustBeMediaTypeData()
  - added parseMediaTypeData()
  - added validateMediaTypeData()
* MediaTypeParts
  - added MediaTypeParts
  - added MediaTypeParameters
  - added FormatMediaTypePartsRuleset
  - added formatMediaTypeParts()
  - added MediaTypePartsToLowerCase ruleset
  - added MediaTypePartsToUpperCase ruleset
  - added normaliseMediaTypeParts()
* OptionTypes
  - added ContentTypeOrMediaType
  - added resolveToContentType()
  - added resolveToMediaType()
