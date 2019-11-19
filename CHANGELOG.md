# Changelog
All notable changes to this project will be documented in this file.

## [1.3.0] - 2019-10-20

### Added
- Support of TIC CBE/LINKY MONO (associated device configuration is available on [adeunis website](https://www.adeunis.com/produit/tic-compteur-electrique/))
- Support of TIC CBE/LINKY TRI (associated device configuration is available on [adeunis website](https://www.adeunis.com/produit/tic-compteur-electrique/))
- Support of ANALOG / ANALOG PWR

### Fixed
- [UI] In 'supported frame' section, some generic but unsupported frames were wrongly displayed.
- [TEMP3] transmissionPeriodKeepAlive property was in ten seconds
- [0x20] Improve decoding by adding loraClassMode and loraDutycyle properties

## [1.2.0] - 2019-09-30

In this version all codecs have been updated to best fit one-M2M TS-0023 recommendations.
Therefore this version is not backward compatible with version 1.1.1 regarding output contents (schema, property names,...).
In next versions adeunis will do its best to ensure backward compatibility to limit customer development efforts. 

### Other changes
- User interface has been updated to be more ergonomic
- [JS] Internal core layer has been updated: it is now mandatory to select the product before decoding a frame. Call setDeviceType() method for that purpose.

## [1.1.1] - 2019-07-05

### Fixed
- [TEMP 3] 0x58: alarmTemperature2 displays the first temperature

## [1.1.0] - 2019-07-04

### Added
- Support of TEMP 3
- Support of PULSE 3
- Decoding of generic frames 0x2f and 0x33

### Fixed
- [COMFORT] 0x4d: bad decoding of humidity alarm bit
- [TEMP] 0x43: wrong management of an invalid temperature

## [1.0.0] - 2019-06-03

### Added
- Support of DELTA P

### Fixed
- [REPEATER] bug fixes
- [DRYCONTACTS] 0x40: issue when decoding from html page
- [PULSE] 0x10: decoding issue

## [0.4.2] - 2019-03-29

### Added
- Support of REPEATER

# Archives (.tgz)
- [1.2.0](http://codec-adeunis.com/adeunis-codecs-1.2.0.tgz)
- [1.1.1](http://codec-adeunis.com/adeunis-codecs-1.1.1.tgz)
- [1.1.0](http://codec-adeunis.com/adeunis-codecs-1.1.0.tgz)
- [1.0.0](http://codec-adeunis.com/adeunis-codecs-1.0.0.tgz)
- [0.4.2](http://codec-adeunis.com/adeunis-codecs-0.4.2.tgz)