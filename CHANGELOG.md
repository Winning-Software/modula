# Modula Changelog

All notable changes to this project will be documented in this file.

## [0.5.0] - 2024-06-21
### Added
- Implement `ApplicationStore` for global variable storage
- Add route protection via `requireAuth` route option

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- Fixed issue with external links not working

### Security
- N/A

---

## [0.4.0] - 2024-06-17
### Added
- Include API classes in core `@dannyxcii/modula` package (removed from `@dannyxcii/create-modula-app`)
- Added `afterMount` method on `Component` to allow for adding event listeners and other post-render functionality

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- N/A

---

## [0.3.2] - 2024-06-09
### Added
- N/A

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- Fixed issue where API requests were firing twice from components

### Security
- N/A

---

## [0.3.1] - 2024-06-09
### Added
- N/A

### Changed
- General formatting updates

### Deprecated
- N/A

### Removed
- N/A

### Security
- N/A

---

## [0.3.0] - 2024-06-09
### Added
- Added new abstract components for specifying `PageComponent` and `TemplateComponent`
- Components loaded via a route should now extend `PageComponent`
- Components used as Modula's `template` option should extend `TemplateComponent`

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Security
- N/A

---

## [0.2.0] - 2024-06-08
### Added
- Added unit tests

### Changed
- Now renders components prior to loading data, then re-renders once data is loaded.

### Deprecated
- N/A

### Removed
- N/A

### Security
- N/A

---

## [0.1.0] - 2024-06-07
### Added
- Initial Release

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Security
- N/A