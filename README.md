# Uptime Card

A minimalist card inspired by [reddit status](https://www.redditstatus.com/) UI to display binary sensors in a nice way.

<p align="center">
  <img src="https://raw.githubusercontent.com/dylandoamaral/uptime-card/main/images/showcase.png" />
</p>

## Install  🏠

:warning: Versions 0.X.X are not stable and still have many bugs, don't hesitate to raise an issue if something is wrong with the card or if you have a feature request. Therefore, it will need many updates, until the version 1.0.0, in order to fix as much as possible bugs as fast as possible.

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
| hours_to_show | number | 24 | v0.0.1 | Set the number of hours to show.
| name | string |  | v0.0.1 | Set a custom title to the card.
| icon | string |  | v0.0.1 | Set a custom icon from [mdi icons](https://iconify.design/icon-sets/mdi/).
| severity | number | 100 | v0.0.1 | Set a threshold in percentage to specify when a bar both ok and ko is red instead of yellow.
| update_interval | number | | v0.0.1 | Set the an interval for the card to update.
| average_text | string | % | v0.0.2 | Set the average text.
| title_adaptive_color | boolean | false | v0.0.2 | The title text color is the same as the current status color.
| status_adaptive_color | boolean | false | v0.0.2 | The status text color is the same as the current status color.
| icon_adaptive_color | boolean | false | v0.0.2 | The icon color is the same as the current status color.

### Bar configuration

**Parent key:** bar

| Name | Type | Default | Since | Description |
|------|:----:|:-------:|:-----:|-------------|
| height | number | 46 | v0.0.1 | Set the height of the bars.
| round | number | 1 | v0.0.1 | Set the round radius for the bars.
| spacing | number | 4 | v0.0.1 | Set the spacing between the bars.
| amount | number | 36 | v0.0.1 | Set the number bars.

### Color configuration

**Parent key:** color

| Name | Type | Default | Since | Description |
|------|:----:|:-------:|:-----:|-------------|
| ok | color | #45C669 | v0.0.1 | Set the ok color.
| ko | color | #C66445 | v0.0.1 | Set the ko color.
| half | color | #C6B145 | v0.0.1 | Set the half color.
| none | color | #C9C9C9 | v0.0.1 | Set the none color.
| title | color | grey | v0.0.2 | Set the title text color, title_adaptive_color must be false.
| status | color | gray | v0.0.2 | Set the status text color, status_adaptive_color must be false.
| icon | color | | v0.0.2 | Set the icon text color, icon_adaptive_color must be false.

### Show configuration

**Parent key:** show

| Name | Type | Default | Since | Description |
|------|:----:|:-------:|:-----:|-------------|
| header | boolean | true | v0.0.1 | Show the header.
| name | boolean | true | v0.1.0 | Show the name.
| icon | boolean | true | v0.0.1 | Show the icon.
| status | boolean | true | v0.0.1 | Show the status.
| timeline | boolean | true | v0.0.1 | Show the timeline.
| footer | boolean | true | v0.0.1 | Show the footer.
| average | boolean | true | v0.0.2 | Show the average.

### Alias configuration

**Parent key:** alias

| Name | Type | Default | Since | Description |
|------|:----:|:-------:|:-----:|-------------|
| ok | string | | v0.0.1 | Set a friendly name for ok state.
| ko | string | | v0.0.1 | Set a friendly name for ko state.

### Tooltip configuration

**Parent key:** tooltip

| Name | Type | Default | Since | Description |
|------|:----:|:-------:|:-----:|-------------|
| hour24 | boolean | true | v0.1.0 | Set to true to display times in 24-hour format.
| template | string | `${from_date} - ${to_date} | ${average}%` | v0.0.1 | Set a template format of the tooltip.
| animation | boolean | true | v0.1.0 | Set to true to show bar animation on hover.

For the template, available interpolations are:
- `${from_date}`: the start date of the bar.
- `${to_date}`: the end date of the bar.
- `${average}`: the percentage of on during the period.

## Example 📊

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
  ok: '#f9d71c'
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

- [X] Add the card to HACS
- [ ] Clickable card (link to website or show history)
- [ ] Calendar mode
- [ ] More customizations
- [ ] Add tooltip for bars

## For developers 👨‍💻

If you want to add a feature or fix a bug by yourself, follow these instructions:

1. Inside a home assistant environment, clone the repository into `config/www`.

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

### Contribution

Don't hesitate to ask for features or to contribute by yourself ⭐.

### Inspiration

This repository is inspired by [mini-graph-card](https://github.com/kalkih/mini-graph-card) and [boilerplate-card](https://github.com/custom-cards/boilerplate-card).
