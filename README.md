<h1 align="center">Uptime Card</h1>

<p align="center">
  <a href="https://github.com/custom-components/hacs">
    <img src="https://img.shields.io/badge/HACS-Default-orange.svg" />
  </a>
  <a href="https://github.com/dylandoamaral/uptime-card">
    <img src="https://img.shields.io/github/v/release/dylandoamaral/uptime-card" />
  </a>
  <a href="https://github.com/dylandoamaral/uptime-card">
    <img src="https://img.shields.io/github/commit-activity/m/dylandoamaral/uptime-card" />
  </a>
</p>

<p align="center">A minimalist card inspired by the <a href="https://www.redditstatus.com">reddit status</a> UI to display binary sensors in a nice way.</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/dylandoamaral/uptime-card/main/images/showcase.png" />
</p>

## Install 🏠

:warning: Versions 0.x.x are not very stable and still have many bugs, please create an issue if you encounter a bug or have a feature request.

### HACS (recommended)

This card is available in [HACS](https://hacs.xyz/) (Home Assistant Community Store).

### Manual install

1. Download and copy `uptime-card.js` from the [latest release](https://github.com/dylandoamaral/uptime-card/releases/latest) into your `config/www` directory.
2. Add the resource reference inside your `configuration.yaml` with URL `/local/uptime-card.js` and type `module`.
3. Add the custom card to your panel and 🚀.

## Configuration ⚙️

Uptime card is highly customizable.

### Global config

| Name | Type / Options | Default | Since | Description |
|------|:--------------:|:-------:|:-----:|-------------|
| entity (**required**) | string |  | v0.0.1 | Specify entity ID of the sensor
| ok | string |  | v0.0.1 | Specify the `on` state for the entity, either `ok` or `ko` should be set if entity isn't a binary sensor. **[More info](https://github.com/dylandoamaral/uptime-card#ok-and-ko-options)**.
| ko | string |  | v0.0.1 | Specify the `off` state for the entity, either `ok` or `ko` should be set if entity isn't a binary sensor. **[More info](https://github.com/dylandoamaral/uptime-card#ok-and-ko-options)**.
| name | string |  | v0.0.1 | Set a custom title of the card.
| icon | string | `icon` attribute \|\| `mdi:heart` | v0.0.1 | Specify a custom icon, e.g. `mdi:home`
| ko_icon | string | `icon` option \|\| `icon` attribute \|\| `mdi:heart` | v0.2.0 | Specify a custom icon for ko status, e.g. `mdi:home`
| hours_to_show | number | `24` | v0.0.1 | Set the number of hours to show.
| update_interval | number | | v0.0.1 | Set the update interval for the card.
| average_text | string | `%`| v0.0.2 | Set the average text to be displayed at the bottom.
| severity | number | `100` | v0.0.1 | Set a threshold in percentage to specify when a bar both ok and ko is red instead of yellow.
| status_template | string | `[[ current ]]` | v0.1.0 | Set the template for the status. **[More info](https://github.com/dylandoamaral/uptime-card#templating)**.
| title_adaptive_color | `true`/`false` | `false` | v0.0.2 | Make the title color adapt with the entity color.
| status_adaptive_color | `true`/`false` | `false` | v0.0.2 | Make the name color adapt with the entity color.
| icon_adaptive_color | `true`/`false` | `false` | v0.0.2 | Make the name color adapt with the entity color.
| tooltip_adaptive_color | `true`/`false` | `false` | v0.1.0 | Make the name color adapt with the entity color.

### Bar config

**Parent key:** `bar`

| Name | Type / Options | Default | Since | Description |
|------|:--------------:|:-------:|:-----:|-------------|
| height | number | `46` | v0.0.1 | Set the height of the bars.
| round | number | `1` | v0.0.1 | Set the round radius for the bars.
| spacing | number | `4` | v0.0.1 | Set the spacing between the bars.
| amount | number | `36` | v0.0.1 | Set the number of bars.

### Color config

**Parent key:** `color`

| Name | Type / Options | Default | Since | Description |
|------|:--------------:|:-------:|:-----:|-------------|
| ok | color | ![ ](https://dummyimage.com/20x10/45c669&amp;text=+) `#45C669` | v0.0.1 | Set the `ok` color.
| ko | color | ![ ](https://dummyimage.com/20x10/c66445&amp;text=+) `#C66445` | v0.0.1 | Set the `ko` color.
| half | color | ![ ](https://dummyimage.com/20x10/c6b145&amp;text=+) `#C6B145` | v0.0.1 | Set the `half` color.
| none | color | ![ ](https://dummyimage.com/20x10/c9c9c9&amp;text=+) `#C9C9C9` | v0.0.1 | Set the `none` color.
| title | color | ![ ](https://dummyimage.com/20x10/808080&amp;text=+) `grey` | v0.0.2 | Set the title text color, `title_adaptive_color` must be false.
| status | color | ![ ](https://dummyimage.com/20x10/808080&amp;text=+) `grey` | v0.0.2 | Set the status text color, `status_adaptive_color` must be false.
| icon | color | ![ ](https://dummyimage.com/20x10/44739e&amp;text=+) `--paper-item-icon-color` | v0.0.2 | Set the icon text color, `icon_adaptive_color` must be set to `false`.
| tooltip | color | ![ ](https://dummyimage.com/20x10/808080&amp;text=+) `grey` | v0.1.0 | Set the tooltip text color, tooltip_adaptive_color must be false.

### Show config

**Parent key:** `show`

| Name | Type / Options | Default | Since | Description |
|------|:--------------:|:-------:|:-----:|-------------|
| header | `true`/`false` | `true` | v0.0.1 | Show/hide the header.
| title | `true`/`false` | `true` | v0.1.0 | Show/hide the title.
| icon | `true`/`false` | `true` | v0.0.1 | Show/hide the icon.
| status | `true`/`false` | `true` | v0.0.1 | Show/hide the status.
| timeline | `true`/`false` | `true` | v0.0.1 | Show/hide the timeline.
| average | `true`/`false` | `true` | v0.0.2 | Show/hide the average.
| footer | `true`/`false` | `true` | v0.0.1 | Show/hide the footer.

### Alias config

**Parent key:** `alias`

| Name | Type / Options | Default | Since | Description |
|------|:--------------:|:-------:|:-----:|-------------|
| ok | string | | v0.0.1 | Set a friendly name for `ok` state.
| ko | string | | v0.0.1 | Set a friendly name for `ko` state.

### Tooltip config

**Parent key:** `tooltip`

| Name | Type / Options | Default | Since | Description |
|------|:--------------:|:-------:|:-----:|-------------|
| hour24 | `true`/`false` | `false` | v0.1.0 | Set to `true` to display time in 24-hour format.
| template | string | `[[ from_date ]] - [[ to_date ]] \| [[ average ]]%` | v0.1.0 | Set a template for the tooltip **[More info](https://github.com/dylandoamaral/uptime-card#templating)**.
| animation | `true`/`false` | `true` | v0.1.0 | Set to `true` to show bar animation on hover.

### Action config

**Parent key:** `tap_action`

| Name | Type / Options | Default | Since | Description |
|------|:--------------:|:-------:|:-----:|-------------|
| action | `more-info`/`url`/`navigate`/`toggle`/`call-service`/`fire-dom-event` | `more-info` | v0.2.0 (`more-info`/`url`) v0.3.0 (`navigate`/`toggle`/`call-service`/`fire-dom-event`)| Action to perform.
| entity | string | | v0.3.0 | (Only for `more-info`) Override the entity for more information.
| navigation_path | string | | v0.3.0 | (Only for `navigate`) Path to navigate to (e.g. `/lovelace/0/`).
| ~~url~~ url_path | string | | ~~v0.2.0~~ v0.3.0 | (Only for `url`) URL to open.
| service | string | | v0.3.0 | (Only for `call-service`) Service to call.
| service-data | string | | v0.3.0 | (Only for `call-service`) Service data to include.
| haptic | `success`/`warning`/`failure`/`light`/`medium`/`heavy`/`selection` | | v0.3.0 | Haptic feedback for the [Beta IOS App].(https://www.home-assistant.io/ios/beta)
| confirmation | object | | v0.3.0 | Display a confirmation popup.


**Parent key:** `tap_action.confirmation`

| Name | Type / Options | Default | Since | Description |
|------|:--------------:|:-------:|:-----:|-------------|
| text | string | | v0.3.0 | This text will be displayed in the popup.
| exemptions | array | | v0.3.0 | Any user declared in this list will not see the confirmation dialog.

### Alignment config

**Parent key:** `alignment`

| Name | Type / Options | Default | Since | Description |
|------|:--------------:|:-------:|:-----:|-------------|
| header | `left`/`right`/`center`/`spaced` | `spaced` | v0.2.0 | Select the spacing strategy between title and icon.
| icon_first | `true`/`false` | `false` | v0.2.0 | Set the icon before the title.
| status | `left`/`right`/`center`/`spaced` | `spaced` | v0.2.0 | Select the spacing strategy between state and tooltip.
| tooltip_first | `true`/`false` | `false` | v0.2.0 | Set the tooltip before the status.

## Examples 📊

### Example 1

<p align="center">
  <img src="https://raw.githubusercontent.com/dylandoamaral/uptime-card/main/images/example_1.png" />
</p>

```yaml
type: 'custom:uptime-card'
entity: binary_sensor.updater
icon: 'mdi:raspberry-pi'
name: HA update
hours_to_show: 168
status_adaptive_color: true
alias:
  ok: Update available !
  ko: No update for the moment...
color:
  icon: grey
show:
  footer: false
```

### Example 2

<p align="center">
  <img src="https://raw.githubusercontent.com/dylandoamaral/uptime-card/main/images/example_2.png" />
</p>

```yaml
type: 'custom:uptime-card'
entity: sun.sun
name: Sun
icon: 'mdi:weather-sunny'
ko_icon: 'mdi:weather-sunny-off'
ko: below_horizon
icon_adaptive_color: true
title_adaptive_color: true
color:
  ok: '#F9d71C'
  ko: '#053752'
  half: '#EF810E'
bar:
  spacing: 4
  height: 10
  round: 4
show:
  average: false
  status: false
alignment:
  status: spaced
  header: left
  icon_first: true
tap_action:
  action: more-info
```

### Example 3

<p align="center">
  <img src="https://raw.githubusercontent.com/dylandoamaral/uptime-card/main/images/example_3.png" />
</p>

```yaml
type: 'custom:uptime-card'
entity: binary_sensor.ping_google
# Home Assistant ping integration - https://www.home-assistant.io/integrations/ping
name: 'https://www.google.com/'
icon: 'mdi:heart'
hours_to_show: 72
title_adaptive_color: true
average_text: '% uptime'
bar:
  height: 46
  round: 0
  spacing: 10
  amount: 6
show:
  status: false
  icon: false
tap_action:
  action: url
  url: 'https://www.google.com/'
alignment:
  status: spaced
  header: center
```

## Roadmap 🗺️

- Clickable card (link to website or show history)
- Calendar mode
- More customizations

## Additional information ℹ️

### `ok` and `ko` options

For non binary sensors, the uptime card will be in `unknown` state because the card cannot ascertain whether it's state corresponds to `ok` or `ko`.

These can be indiviually specified with either `ok` or `ko`.

These options follow these rules:

- if ok is not defined and ko is not defined -> `unknown`
- if ok is defined and ko is not defined:
  - if the state name equals ok -> `ok`
  - if not -> `ko`
- if ok is not defined and ko is defined:
  - if the state name equals ko -> `ko`
  - if not -> `ok`
- if ok is defined and ok is defined:
  - if the state name equals ok -> `ok`
  - if the state name equals ko -> `ko`
  - if not -> `unknown`

## Templating

Custom templates can be used to customize the displayed text of `status` and `tooltip`.

Generally speaking, templates allows the ability to print either current values from the sensor or special variables, available either for the status or the tooltip.

Either generic or specific interpolations exist using `[[ my.key ]]` structure.

### Generic interpolations

By default, for both `status` and `tooltip` you can print sensor data.

For example, using sensor `sun.sun` has the following attributes:

```yaml
next_dawn: 2021-04-03T04:35:43+00:00
next_dusk: 2021-04-02T18:49:59+00:00
next_midnight: 2021-04-02T23:43:38+00:00
next_noon: 2021-04-02T11:44:03+00:00
next_rising: 2021-04-03T05:10:32+00:00
next_setting: 2021-04-02T18:15:16+00:00
elevation: 38.83
azimuth: 148.33
rising: true
friendly_name: Sun
```

The attribute `friendly_name` can be used using template, `[[ sun.sun.attributes.friendly_name ]]`.

### Specific interpolations

By default each template has their own interpolations.

#### `Status`

`status` has the following interpolations:

- `[[ current ]]`: the current status.
- `[[ ok ]]`: the `ok` status.
- `[[ ko ]]`: the `ko` status.

#### `Tooltip`

`tooltip` has the following interpolations:

- `[[ from_date ]]`: the start date of the bar.
- `[[ to_date ]]`: the end date of the bar.
- `[[ average ]]`: the percentage of `on` during the period.

#### Example

These can be combined to create a sentence.

As an example, to retrieve the status of a `sun.sun` entity, template `[[ sun.sun.attributes.friendly_name ]] is [[ current ]]` can be specified.

Which will print `Sun is Above Horizon` (if the sensor is in `ok` state and if alias is `Above Horizon`.)

### Contribution

Don't hesitate to ask for features or to contribute by yourself ⭐.

## For developers 👨‍💻

If you want to add a feature or fix a bug by yourself, follow these instructions:

1. Inside a Home Assistant environment, clone the repository into `config/www`.
2. [Add the resource reference](https://www.home-assistant.io/lovelace/dashboards-and-views/#resources).

```yaml
resources:
  - url: /local/uptime-card/dist/uptime-card.js
    type: module
```

3. Install dependencies (requires `nodejs` and `npm`).
4. Start the auto build on save.

```bash
npm start
```

5. Make changes.

### Inspiration

This repository is inspired by two other cards, [mini-graph-card](https://github.com/kalkih/mini-graph-card) and [boilerplate-card](https://github.com/custom-cards/boilerplate-card).
