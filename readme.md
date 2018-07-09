# The Events Calendar: Gutenberg Extension

We've made significant rewrites and refactors of our products over the years, but adapting our plugins to fully integrate with the new editor coming in WordPress version 5.0, code-named "Gutenberg" **is the biggest ecosystem change we’ve faced since the introduction of custom post types.**

This plugin is our first attempt at integrating the Event post type with the Gutenberg editor. Download this plugin as a .zip and install it on your site like any other plugin, or use the _Using developement Version from GitHub_ steps below.

[Read more about _Why Gutenberg is Worth the Effort_](https://theeventscalendar.com/going-gutenberg-chapter/)

---

:warning: **Please Note:** This is an Alpha-version plugin at this point; while we test thoroughly and hope to code well, _we do not recommend running this on production sites_.

---

### Using developement Version from GitHub

1. Clone the Repository
2. Install [Yarn](https://yarnpkg.com) _(better)_ or [NPM](https://www.npmjs.com/)
3. Run `yarn install` on the repository
4. Run `yarn run build` to generate Assets for the Plugin


---

### Changelog

#### 0.2.4-alpha - TBD

* Fix - Styles for map container and fix map error
* Fix - Issue on `datetime` block to select the date on Gutenberg 3.1
* Tweak - Consolidate multiple stores into a single store
* Tweak - Use native redux store implementation
* Tweak - Remove references to `withSelect` and `withDispatch` and replace with `connect`
* Tweak - Prevent errors when a new organizer block is created
* Tweak - `showMap` and `showMapLink` are enabled by default on Location block
* Feature - HOC `withDetails` to fetch details of a post type.
* Feature - HOC `withForm` to attach Form behaviors into a block.
* Feature - HOC `withStore` to inject the store property into a component
* Feature - `useOnce` properties from block to allow live sync copies of blocks

#### 0.2.3-alpha - 2018-06-22

* Feature - Add filter `tec.datetime.defaultRange` to change the default number of days to use in a range
* Fix - Prevent render empty content on organizer block
* Fix - Issue with wrong translation domain
* Fix - Add `autosave` endpoint for other types like Organizers or Venues
* Fix - Issues with the layout of blocks to avoid hide controls
* Fix - Issue with deleting organizer block and reflecting on Classic Event Details
* Fix - Issue with deleting location block and retaining old location data
* Fix - Event link block styles and functionality
* Fix - Remove `multiday` to be set automatically in some situations
* Fix - Keep the dashboard open if the calendar is advanced several months ahead
* Fix - Render the selected month inside of the calendar instead of the current month
* Fix - Normalize styles on Form fields and Colors on Dashboard
* Fix - Standarize styles on Form fields and Colors on Dashboard
* Fix - Render Event Links Block accordingly to their attributes
* Tweak - Align edit button in Organizer and Venue block next to the title
* Tweak - Set event links as last on default load for new event
* Tweak - Fix Organizer and Venue block styles
* Tweak - Update Delete icon for Organizer and Venue block
* Tweak - Standardize the color of blue and dashboard background
* Tweak - Add custom icon for custom blocks
* Tweak - Enable selection of days on the past
* Tweak - Remove format controls from `<RichText>` components
* Tweak - Organize Store based on actions and selectors
* Tweak - Styles to match style guide
* Tweak - Event Website block now renders on the FE

#### 0.2.2-alpha - 2018-06-15

* Feature - Featured Image Block for Events
* Feature - Actual migration for Classic Editor Events into Blocks Editor
* Feature - Event Date Time can now move Years forward
* Feature - Event links now are saved as attributes
* Feature - When searching a venue or organizer you can always create the searched value
* Tweak - Favor the usage of HOC to sync / save data in details store
* Tweak - Remove prefixes from store to make it more clear
* Tweak - Removal of new volatile meta fields to store temp data
* Fix - issues with sync of data between components with the same data
* Fix - Event price and description are stored correctly

#### 0.2.1-alpha - 2018-06-01

* Feature - Event Organizer is now a standalone block
* Feature - Event Categories is now a standalone block
* Feature - Event Tags is now a standalone block
* Feature - Event Website is now a standalone block
* Feature - Event can set a unique separator for Date and Time instead of using a global value for all events.
* Tweak - Event Details is now renamed to Classic Event Details (final name)
* Tweak - Event Location (old venue) is now improved and has new interface
* Tweak - Deprecated Subtitle block in favor of Event Datetime block
* Tweak - Improved compatibility with the Classic Block users
* Fix - Fixing some CSS for all of the PlainText input fields on Event Details

#### 0.2.0-alpha - 2018-05-17

* Feature - Event Price has his own block
* Feature - Event Subtitle has a range selector with calendars to select multiple days
* Feature - Event Subtitle has the option to set the Multiday or All day values
* Feature - Event Details data has a Redux Store where the data is centralized
* Fix - Event Details fix issues when selecting the data from the dashboard using the Store
* Fix - Resolve a few warnings due to Gutenberg changes in the past few releases, using now `wp.editor` instead of `wp.blocks`

#### 0.1.9-alpha - 2018-05-03

* Feature - Add store implementation to load multiple pages of `venues` and `organizers`
* Feature - Add new `<Dashboard />` component
* Feature - Add time selection inside of the `<Dashboard />` component
* Feature - Add `MultiDay` checkbox
* Tweak - Update label render based on factors like same day or all day events
* Fix - Update all instances of domain into `events-gutenberg`

#### 0.1.8-alpha - 2018-04-12

* Tweak - Improved the modularization of our CSS files to allow better extensibility
* Tweak - Moved into using `events-gutenberg` domain
* Fix - Actually load the text domain into the correct place for the JavaScript

#### 0.1.7-alpha — 2018-04-10

* Tweak - Re-organized Module files to make Elements CSS more modularized and more performant
* Tweak - Countries and US states are available as `<select>` element on Venue creation.

#### 0.1.6-alpha &mdash; 2018-04-05

* Fix - Preventing Google Maps JavaScript API to re-render on block focus (performance)
* Tweak - Added field validation to Location and Organizer creation dropdown forms

#### 0.1.5-alpha &mdash; 2018-04-04

* Tweak - Add required Google JavaScript API into Location Block

#### 0.1.4-alpha &mdash; 2018-03-27

* Feature - Added the structure for All Day Events

#### 0.1.3-alpha &mdash; 2018-03-23

* Feature - Added a Timezone picker into Subtitle Block
* Tweak - Added filter `tribe_events_editor_default_template` to allow tweaking which default blocks will be used

#### 0.1.2-alpha &mdash; 2018-03-13

* Feature - Venue Block sidebar control for displaying Google Maps Link and Embed
* Feature - Event Details Block sidebar control for currency and currency symbol positon
* Tweak - Date and Time Picker split into two fields to improve User Experience
* Tweak - Time Picker now is no longer based on default Gutenberg Timepicker
* Tweak - Improved internal query of Tribe Settings
* Fix - Add existing Posts now orders by title instead of modified date `<SearchPosts>`

#### 0.1.1-alpha &mdash; 2018-03-08

* Feature - Events Single page will now respect configurations from Blocks Editor
* Feature - Create a Event Links block
* Tweak - Add capability checks for the meta fields
* Tweak - Add Cost field to Event Details block
* Tweak - Venue Block now has Website and Phone fields
* Fix - Use the Google Maps API key for Blocks Editor venue image
* Fix - Button to remove organizers functions properly
* Fix - Venue loading optimized to avoid having `eventVenue` showing on the public block props
* Fix - Makes sure we only load the plugin once Blocks Editor is fully loaded

#### 0.1.0-alpha &mdash; 2018-03-02

* *Note - Front-end still doesn't respect blocks from Gutenberg*
* Feature - Created Subtitle block
* Feature - Created Event Details and Organizer block
* Feature - Created Event Venue block
