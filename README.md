# Uptime Card

A minimalist card inspired by [reddit status](https://www.redditstatus.com/) UI to display binary sensors in a nice way.

<p align="center">
  <img src="https://raw.githubusercontent.com/dylandoamaral/uptime-card/main/images/showcase.png" />
</p>

## Install  🏠

:warning: Versions 0.x.x are not very stable and still have many bugs, please raise an issue if you face a bug or have a feature request.

### HACS (recommended)

This card is available in [HACS](https://hacs.xyz/) (Home Assistant Community Store).

### Manual install

1. Download and copy `uptime-card.js` from the [latest release](https://github.com/dylandoamaral/uptime-card/releases/latest) into your `config/www` directory.
2. Add the resource reference inside your `configuration.yaml` with URL `/local/uptime-card.js` and type `module`.
3. Add the custom card to your panel and 🚀.

## Configurations ⚙️

Uptime card is highly customizable.

### Global configuration

| Name | Type | Default | Since | Description |
|------|:----:|:-------:|:-----:|-------------|
| entity **required** | string |  | v0.0.1 | Set the binary sensor entity id.
| ok | string |  | v0.0.1 | Set the state name corresponding to on, either ok or ko should be setup if the entity is not a binary sensor **[for more information](https://github.com/dylandoamaral/uptime-card#ok-and-ko-options)**.
| ko | string |  | v0.0.1 | Set the state name corresponding to off, either ok or ko should be setup if the entity is not a binary sensor **[for more information](https://github.com/dylandoamaral/uptime-card#ok-and-ko-options)**.
| status_template | string | [[ current ]] | v0.1.0 | Set the template for the status **[for more information](https://github.com/dylandoamaral/uptime-card#templating)**.
| hours_to_show | number | 24 | v0.0.1 | Set the number of hours to show.
| name | string |  | v0.0.1 | Set a custom title to the card.
| icon | string |  | v0.0.1 | Set a custom icon from [mdi icons](https://iconify.design/icon-sets/mdi/).
| severity | number | 100 | v0.0.1 | Set a threshold in percentage to specify when a bar both ok and ko is red instead of yellow.
| update_interval | number | | v0.0.1 | Set the an interval for the card to update.
| average_text | string | % | v0.0.2 | Set the average text.
| title_adaptive_color | boolean | false | v0.0.2 | The title text color is the same as the current status color.
| status_adaptive_color | boolean | false | v0.0.2 | The status text color is the same as the current status color.
| icon_adaptive_color | boolean | false | v0.0.2 | The icon color is the same as the current status color.
| tooltip_adaptive_color | boolean | false | v0.1.0 | The tooltip text color is the same as the selected bar color.

### Bar configuration

**Parent key:** `bar`

| Name | Type | Default | Since | Description |
|------|:----:|:-------:|:-----:|-------------|
| height | number | `46` | v0.0.1 | Set the height of the bars.
| round | number | `1` | v0.0.1 | Set the round radius for the bars.
| spacing | number | `4` | v0.0.1 | Set the spacing between the bars.
| amount | number | `36` | v0.0.1 | Set the number of bars.

### Color configuration

**Parent key:** color

| Name | Type | Default | Since | Description |
|------|:----:|:-------:|:-----:|-------------|
| ok | color | `#45C669` | v0.0.1 | Set the `ok` color.
| ko | color | `#C66445` | v0.0.1 | Set the `ko` color.
| half | color | `#C6B145` | v0.0.1 | Set the half color.
| none | color | `#C9C9C9` | v0.0.1 | Set the none color.
| title | color | `grey` | v0.0.2 | Set the title text color, `title_adaptive_color` must be false.
| status | color | `gray` | v0.0.2 | Set the status text color, `status_adaptive_color` must be false.
| icon | color | | v0.0.2 | Set the icon text color, `icon_adaptive_color` must be false.
| tooltip | color | grey | v0.1.0 | Set the tooltip text color, tooltip_adaptive_color must be false.

### `Show` configuration

**Parent key:** show

| Name | Default | Options | Description |
|------:|:------:|:-----:|-------------|
| header | `true` | `true`/`false` | Show/hide the header.
| title | `true` | `true`/`false` | Show the title.
| icon | `true` | `true`/`false` | Show/hide the icon.
| status | `true` | `true`/`false` | Show/hide the status.
| timeline | `true` | `true`/`false` | Show/hide the timeline.
| average | `true` | `true`/`false` | Show/hide the average.
| footer | `true` | `true`/`false` | Show/hide the footer.

### Alias configuration

**Parent key:** alias

| Name | Type | Default | Since | Description |
|------|:----:|:-------:|:-----:|-------------|
| ok | string | | v0.0.1 | Set a friendly name for `ok` state.
| ko | string | | v0.0.1 | Set a friendly name for `ko` state.

### Tooltip configuration

**Parent key:** `tooltip`

| Name | Type | Default | Since | Description |
|------|:----:|:-------:|:-----:|-------------|
| hour24 | boolean | `false` | v0.1.0 | Set to true to display 24-hour time.
| template | string | `[[ from_date ]] - [[ to_date ]] | [[ average ]]%` | v0.1.0 | Set the template for the tooltip **[for more information](https://github.com/dylandoamaral/uptime-card#templating)**.
| animation | boolean | `true` | v0.1.0 | Set to true to show bar animation on hover.


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
entity: binary_sensor.ping_google # You can add one of these using https://www.home-assistant.io/integrations/ping/
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

## For developers 👨‍💻

If you want to add a feature or fix a bug by yourself, follow these instructions:

1. Inside a Home Assistant environment, clone the repository into `config/www`.
2. Add the resource reference (https://www.home-assistant.io/lovelace/dashboards-and-views/#resources).

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

## Additional information ℹ️
### Ok and ko options

For non binary sensor, the uptime card will be in `unknown` state because it doesn't know which status correspond to an `ok` signal or a `ko` signal. You can specify it using either `ok` or `ko` options.

These options follow the following rules:
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

It is possible to apply templates for status and tooltip. It allows you to customize the text of these inputs according to a particular template.

Generally speaking, template allows you to print either current values from the sensor or special variables only available either for the status or the tooltip.

Either generic or specific interpolations exist using `[[ my.key ]]` structure.

### Generic interpolations

By default for both status and tooltip you can print sensor data.

For example, if we are currently using the sensor `sun.sun`, I have the following attributes:

```
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

I can for example print the friendly_name using `[[ sun.sun.attributes.friendly_name]]`.

### Specific interpolations

By default each templates have his own interpolations.

#### Status

The status have the following interpolation:
- `[[ current ]]`: the current status.
- `[[ ok ]]`: the ok status.
- `[[ ko ]]`: the the ko status.

#### Tooltip

The tooltip have the following interpolation:
- `[[ from_date ]]`: the start date of the bar.
- `[[ to_date ]]`: the end date of the bar.
- `[[ average ]]`: the percentage of `on` during the period.

#### Example

I can combine all of them to create a sentence.

As an example, for status of a `sun.sun` entity, I can specify the following template: `[[ sun.sun.attributes.friendly_name ]] is [[ current ]]` and it will print `Sun is Above Horizon` (If the sensor is in ok state and if the alias is `Above Horizon`).

### Contribution

Don't hesitate to ask for features or to contribute by yourself ⭐.

### Inspiration

This repository is inspired by [mini-graph-card](https://github.com/kalkih/mini-graph-card) and [boilerplate-card](https://github.com/custom-cards/boilerplate-card).
