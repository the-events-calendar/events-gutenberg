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

#### 0.1.3-alpha &mdash; 2018-03-15

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
