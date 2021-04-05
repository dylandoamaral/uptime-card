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

A minimalist card inspired by the [reddit status](https://www.redditstatus.com) UI to display binary sensors in a nice way.

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

| Name | Type | Default | Since | Description |
|------|:----:|:-------:|:-----:|-------------|
| entity (**required**) | string |  | v0.0.1 | Specify entity ID of the sensor
| ok | string |  | v0.0.1 | Specify the `on` state for the entity, either `ok` or `ko` should be set if entity isn't a binary sensor. **[More info](https://github.com/dylandoamaral/uptime-card#ok-and-ko-options)**.
| ko | string |  | v0.0.1 | Specify the `off` state for the entity, either `ok` or `ko` should be set if entity isn't a binary sensor. **[More info](https://github.com/dylandoamaral/uptime-card#ok-and-ko-options)**.
| name | string |  | v0.0.1 | Set a custom title of the card.
| icon | string |  | v0.0.1 | Specify a custom icon, e.g. `mdi:home`
| hours_to_show | number | `24` | v0.0.1 | Set the number of hours to show.
| update_interval | number | | v0.0.1 | Set the update interval for the card.
| average_text | string | `%`| v0.0.2 | Set the average text to be displayed at the bottom.
| severity | number | `100` | v0.0.1 | Set a threshold in percentage to specify when a bar both ok and ko is red instead of yellow.
| status_template | string | `[[ current ]]` | v0.1.0 | Set the template for the status. **[More info](https://github.com/dylandoamaral/uptime-card#templating)**.
| title_adaptive_color | boolean | `false` | v0.0.2 | Make the title color adapt with the entity color.
| status_adaptive_color | boolean | `false` | v0.0.2 | Make the name color adapt with the entity color.
| icon_adaptive_color | boolean | `false` | v0.0.2 | Make the name color adapt with the entity color.
| tooltip_adaptive_color | boolean | `false` | v0.1.0 | Make the name color adapt with the entity color.

### Bar config

**Parent key:** `bar`

| Name | Type | Default | Since | Description |
|------|:----:|:-------:|:-----:|-------------|
| height | number | `46` | v0.0.1 | Set the height of the bars.
| round | number | `1` | v0.0.1 | Set the round radius for the bars.
| spacing | number | `4` | v0.0.1 | Set the spacing between the bars.
| amount | number | `36` | v0.0.1 | Set the number of bars.

### Color config

**Parent key:** `color`

| Name | Type | Default | Since | Description |
|------|:----:|:-------:|:-----:|-------------|
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

| Name | Default | Options | Since | Description |
|------:|:------:|:-----:|:------:|:-------------|
| header | `true` | `true`/`false` | v0.0.1 | Show/hide the header.
| title | `true` | `true`/`false` | v0.1.0 | Show/hide the title.
| icon | `true` | `true`/`false` | v0.0.1 | Show/hide the icon.
| status | `true` | `true`/`false` | v0.0.1 | Show/hide the status.
| timeline | `true` | `true`/`false` | v0.0.1 | Show/hide the timeline.
| average | `true` | `true`/`false` | v0.0.2 | Show/hide the average.
| footer | `true` | `true`/`false` | v0.0.1 | Show/hide the footer.

### Alias config

**Parent key:** `alias`

| Name | Type | Default | Since | Description |
|------|:----:|:-------:|:-----:|-------------|
| ok | string | | v0.0.1 | Set a friendly name for `ok` state.
| ko | string | | v0.0.1 | Set a friendly name for `ko` state.

### Tooltip config

**Parent key:** `tooltip`

| Name | Type | Default | Since | Description |
|------|:----:|:-------:|:-----:|-------------|
| hour24 | boolean | `false` | v0.1.0 | Set to `true` to display time in 24-hour format.
| template | string | `[[ from_date ]] - [[ to_date ]] \| [[ average ]]%` | v0.1.0 | Set a template for the tooltip **[More info](https://github.com/dylandoamaral/uptime-card#templating)**.
| animation | boolean | `true` | v0.1.0 | Set to `true` to show bar animation on hover.

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
alias:
  ok: Update available !
  ko: No update for the moment...
color:
  icon: grey
hours_to_show: 168
show:
  footer: false
status_adaptive_color: true
```

### Example 2

<p align="center">
  <img src="https://raw.githubusercontent.com/dylandoamaral/uptime-card/main/images/example_2.png" />
</p>

```yaml
type: 'custom:uptime-card'
bar:
  spacing: 4
  height: 10
  round: 4
icon: 'mdi:weather-sunny'
entity: sun.sun
name: Sun
ko: below_horizon
color:
  ok: '#F9d71C'
  ko: '#053752'
  half: '#EF810E'
icon_adaptive_color: true
show:
  average: false
  status: false
```

### Example 3

<p align="center">
  <img src="https://raw.githubusercontent.com/dylandoamaral/uptime-card/main/images/example_3.png" />
</p>

```yaml
type: 'custom:uptime-card'
entity: binary_sensor.ping_google 
# Home Assistant ping integration - https://www.home-assistant.io/integrations/ping
icon: 'mdi:heart'
bar:
  height: 46
  round: 0
  spacing: 10
  amount: 6
show:
  status: false
  icon: false
title_adaptive_color: true
hours_to_show: 72
name: 'https://www.google.com/'
average_text: '% uptime'
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
- `[[ ko ]]`: the the `ko` status.

#### `Tooltip`

`tooltip` has the following interpolations:

- `[[ from_date ]]`: the start date of the bar.
- `[[ to_date ]]`: the end date of the bar.
- `[[ average ]]`: the percentage of `on` during the period.

#### Example

These can be combined to create a sentence.

As an example, to retrieve the status of a `sun.sun` entity, template `[[ sun.sun.attributes.friendly_name ]] is [[ current ]]` can be specified.

Which will print `Sun is Above Horizon` (if sensor is in `ok` state and if alias is `Above Horizon`.)

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

This repository is inspired by [mini-graph-card](https://github.com/kalkih/mini-graph-card) and [boilerplate-card](https://github.com/custom-cards/boilerplate-card).
