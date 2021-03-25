# Uptime Card

A minimalist card inspired by [reddit status](https://www.redditstatus.com/) UI to display binary sensors in a nice way.

<p align="center">
  <img src="https://raw.githubusercontent.com/dylandoamaral/uptime-card/main/images/showcase.png" />
</p>

## Install  🏠

### Manual install

1. Download and copy `uptime-card.js` from the [latest release](https://github.com/dylandoamaral/uptime-card/releases/latest) into your `config/www` directory.

2. Add the resource reference inside your `configuration.yaml`.

3. Add the custom card to your panel and 🚀.

## Configurations ⚙️

Uptime card is highly customizable.

Option from version `v0.0.2` are not available yet since it is the work in progress release.

### Global configuration

| Name | Type | Default | Since | Description |
|------|:----:|:-------:|:-----:|-------------|
| entity **required** | string |  | v0.0.1 | Set the binary sensor entity id.
| name | string |  | v0.0.1 | Set a custom title to the card.
| icon | string |  | v0.0.1 | Set a custom icon from [mdi icons](https://iconify.design/icon-sets/mdi/).
| ok **[for more information](https://github.com/dylandoamaral/uptime-card#ok-and-ko-options)** | string |  | v0.0.1 | Set the state name corresponding to on.
| ko **[for more information](https://github.com/dylandoamaral/uptime-card#ok-and-ko-options)** | string |  | v0.0.1 | Set the state name corresponding to off.
| severity | number | 100 | v0.0.1 | Set a threshold in percentage to specify when a bar both ok and ko is red instead of yellow.
| hours_to_show | number | 24 | v0.0.1 | Set the number of hours to show.
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

## Example 📊

### Example 1

<p align="center">
  <img src="https://raw.githubusercontent.com/dylandoamaral/uptime-card/main/images/example_1.png" />
</p>

```yaml
type: 'custom:uptime-card'
entity: binary_sensor.updater
icon: 'mdi:raspberry-pi'
severity: 100
ok: 'on'
ko: 'off'
bar:
  height: 46
  round: 1
  spacing: 4
  amount: 36
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
  amount: 36
  height: 10
  round: 4
icon: 'mdi:weather-sunny'
severity: 100
entity: sun.sun
name: Sun
ko: below_horizon
average_text: '% above horizon'
hours_to_show: 24
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
ko: o
bar:
  height: 46
  round: 0
  spacing: 10
  amount: 6
show:
  status: false
  icon: false
color:
  ok: '#45C669'
  ko: '#C66445'
  none: '#C9C9C9'
  half: '#C6B145'
title_adaptive_color: true
hours_to_show: 72
name: 'https://www.google.com/'
severity: 100
average_text: '% uptime'
```

## Roadmap 🗺️

Roadmap for version 0.1.0.

- [ ] Add the card to HACS
- [ ] Polish code
- [ ] Polish editor (new swatch input and number input)
- [ ] Clickable card (link to website or show history)
- [ ] Polish CSS
- [ ] Add more customizations

## Additional information ℹ️
### Ok and ko options

By default, the uptime card will be in `unknown` state because it doesn't know which status correspond to an `ok` signal or a `ko` signal. You can specify it using either `ok` or `ko` options.

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

Don't hesitate to ask for features or to contribute yourself ⭐.

### Inspiration

This repository is inspired by [mini-graph-card](https://github.com/kalkih/mini-graph-card) and [boilerplate-card](https://github.com/custom-cards/boilerplate-card).