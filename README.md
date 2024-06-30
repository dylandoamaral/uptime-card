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
  <a href="https://www.buymeacoffee.com/dylandoamaral">
    <img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow" />
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

| Name                   |                                   Type / Options                                    |                       Default                        |  Since  | Description                                                                                                                                                                                                                                               |
| ---------------------- | :---------------------------------------------------------------------------------: | :--------------------------------------------------: | :-----: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| entity (**required**)  |                                       string                                        |                                                      | v0.0.1  | Specify entity ID of the sensor                                                                                                                                                                                                                           |
| attribute              |                                       string                                        |                                                      | v0.5.0  | Set the attribute name if the state to monitor isn't the default one.                                                                                                                                                                                     |
| ok                     |                                 string or string[]                                  |                                                      | v0.0.1  | Specify the `on` state(s) for the entity, either `ok` or `ko` should be set if entity isn't a binary sensor. **[More info](https://github.com/dylandoamaral/uptime-card#ok-and-ko-options)**.                                                             |
| ko                     |                                 string or string[]                                  |                                                      | v0.0.1  | Specify the `off` state(s) for the entity, either `ok` or `ko` should be set if entity isn't a binary sensor. **[More info](https://github.com/dylandoamaral/uptime-card#ok-and-ko-options)**.                                                            |
| none                   |                                 string or string[]                                  |                                                      | v0.14.0 | Specify the `none` state(s) for the entity. **[More info](https://github.com/dylandoamaral/uptime-card#ok-and-ko-options)**.                                                                                                                              |
| icon                   |                                       string                                        |          `icon` attribute \|\| `mdi:heart`           | v0.0.1  | Specify a custom icon from [mdi icons](https://iconify.design/icon-sets/mdi/) or an image from `/local` path (since v0.4.0), e.g. `mdi:home`                                                                                                              |
| ko_icon                |                                       string                                        | `icon` option \|\| `icon` attribute \|\| `mdi:heart` | v0.2.0  | Specify a custom icon for ko status, e.g. `mdi:home`                                                                                                                                                                                                      |
| none_icon              |                                       string                                        | `icon` option \|\| `icon` attribute \|\| `mdi:heart` | v0.14.0 | Specify a custom icon for none status, e.g. `mdi:home`                                                                                                                                                                                                    |
| hours_to_show          |                                       number                                        |                         `24`                         | v0.0.1  | Set the number of hours to show, you can go to the minute, you can go up to the minute (1 minute == 0.0167 hours_to_show). :warning: It is deprecated and should be replaced by [duration](https://github.com/dylandoamaral/uptime-card#duration-config). |
| update_interval        |                                       number                                        |                          30                          | v0.0.1  | Set the minimum update interval for the card in seconds.                                                                                                                                                                                                  |
| title_template         |                                       string                                        |  `[[[ return entity.attributes.friendly_name; ]]]`   | v0.8.0  | Set the template for the title. **[More info](https://github.com/dylandoamaral/uptime-card#templating)**.                                                                                                                                                 |
| average_template       |                                       string                                        |                         `%`                          | v0.5.0  | Set the template for the average. **[More info](https://github.com/dylandoamaral/uptime-card#templating)**.                                                                                                                                               |
| severity               |                                       number                                        |                        `100`                         | v0.0.1  | Set a threshold in percentage to specify when a bar both ok and ko is red instead of yellow.                                                                                                                                                              |
| status_template        |                                       string                                        |          `[[[ return variables.current ]]]`          | v0.1.0  | Set the template for the status. **[More info](https://github.com/dylandoamaral/uptime-card#templating)**.                                                                                                                                                |
| title_adaptive_color   |                                   `true`/`false`                                    |                       `false`                        | v0.0.2  | Make the title color adapt with the entity color.                                                                                                                                                                                                         |
| status_adaptive_color  |                                   `true`/`false`                                    |                       `false`                        | v0.0.2  | Make the name color adapt with the entity color.                                                                                                                                                                                                          |
| icon_adaptive_color    |                                   `true`/`false`                                    |                       `false`                        | v0.0.2  | Make the name color adapt with the entity color.                                                                                                                                                                                                          |
| tooltip_adaptive_color |                                   `true`/`false`                                    |                       `false`                        | v0.1.0  | Make the name color adapt with the entity color.                                                                                                                                                                                                          |
| color_thresholds       | list of [thresholds](https://github.com/dylandoamaral/uptime-card#color-thresholds) |                                                      | v0.4.0  | Set the color thesholds.                                                                                                                                                                                                                                  |

### Bar config

**Parent key:** `bar`

| Name    | Type / Options | Default | Since  | Description                        |
| ------- | :------------: | :-----: | :----: | ---------------------------------- |
| height  |     number     |  `46`   | v0.0.1 | Set the height of the bars.        |
| round   |     number     |   `1`   | v0.0.1 | Set the round radius for the bars. |
| spacing |     number     |   `4`   | v0.0.1 | Set the spacing between the bars.  |
| amount  |     number     |  `36`   | v0.0.1 | Set the number of bars.            |

### Color config

**Parent key:** `color`

| Name    | Type / Options |                                  Default                                   |  Since  | Description                                                                                        |
| ------- | :------------: | :------------------------------------------------------------------------: | :-----: | -------------------------------------------------------------------------------------------------- |
| ok      |     color      |         ![ ](https://dummyimage.com/20x10/45c669&text=+) `#45C669`         | v0.0.1  | Set the `ok` color.                                                                                |
| ko      |     color      |         ![ ](https://dummyimage.com/20x10/c66445&text=+) `#C66445`         | v0.0.1  | Set the `ko` color.                                                                                |
| half    |     color      |         ![ ](https://dummyimage.com/20x10/c6b145&text=+) `#C6B145`         | v0.0.1  | Set the `half` color.                                                                              |
| none    |     color      |         ![ ](https://dummyimage.com/20x10/c9c9c9&text=+) `#C9C9C9`         | v0.0.1  | Set the `none` color.                                                                              |
| title   |     color      |          ![ ](https://dummyimage.com/20x10/808080&text=+) `grey`           | v0.0.2  | Set the title text color, `title_adaptive_color` must be false.                                    |
| status  |     color      |          ![ ](https://dummyimage.com/20x10/808080&text=+) `grey`           | v0.0.2  | Set the status text color, `status_adaptive_color` must be false.                                  |
| icon    |     color      | ![ ](https://dummyimage.com/20x10/44739e&text=+) `var(--state-icon-color)` | v0.0.2  | Set the icon text color, `icon_adaptive_color` must be set to `false`.                             |
| ko_icon |     color      |                                same as icon                                | v0.15.0 | Set the ko icon text color, same as icon if not set, `icon_adaptive_color` must be set to `false`. |
| tooltip |     color      |          ![ ](https://dummyimage.com/20x10/808080&text=+) `grey`           | v0.1.0  | Set the tooltip text color, tooltip_adaptive_color must be false.                                  |
| footer  |     color      |         ![ ](https://dummyimage.com/20x10/AAAAAA&text=+) `#AAAAAA`         | v0.15.0 | Set the footer text color.                                                                         |

### Show config

**Parent key:** `show`

| Name     | Type / Options | Default | Since  | Description             |
| -------- | :------------: | :-----: | :----: | ----------------------- |
| header   | `true`/`false` | `true`  | v0.0.1 | Show/hide the header.   |
| title    | `true`/`false` | `true`  | v0.1.0 | Show/hide the title.    |
| icon     | `true`/`false` | `true`  | v0.0.1 | Show/hide the icon.     |
| status   | `true`/`false` | `true`  | v0.0.1 | Show/hide the status.   |
| timeline | `true`/`false` | `true`  | v0.0.1 | Show/hide the timeline. |
| average  | `true`/`false` | `true`  | v0.0.2 | Show/hide the average.  |
| footer   | `true`/`false` | `true`  | v0.0.1 | Show/hide the footer.   |

### Alias config

**Parent key:** `alias`

| Name | Type / Options | Default | Since  | Description                         |
| ---- | :------------: | :-----: | :----: | ----------------------------------- |
| ok   |     string     |         | v0.0.1 | Set a friendly name for `ok` state. |
| ko   |     string     |         | v0.0.1 | Set a friendly name for `ko` state. |

### Tooltip config

**Parent key:** `tooltip`

| Name      | Type / Options |                                                   Default                                                    | Since  | Description                                                                                              |
| --------- | :------------: | :----------------------------------------------------------------------------------------------------------: | :----: | -------------------------------------------------------------------------------------------------------- |
| hour24    | `true`/`false` |                                                   `false`                                                    | v0.1.0 | Set to `true` to display time in 24-hour format.                                                         |
| template  |     string     | `[[[ return variables.from_date ]]] - [[[ return variables.to_date ]]] \| [[[ return variables.average ]]]%` | v0.1.0 | Set a template for the tooltip **[More info](https://github.com/dylandoamaral/uptime-card#templating)**. |
| animation | `true`/`false` |                                                    `true`                                                    | v0.1.0 | Set to `true` to show bar animation on hover.                                                            |

### Action config

**Parent key:** `tap_action`

| Name             |                            Type / Options                             |   Default   |                                          Since                                          | Description                                                                     |
| ---------------- | :-------------------------------------------------------------------: | :---------: | :-------------------------------------------------------------------------------------: | ------------------------------------------------------------------------------- |
| action           | `more-info`/`url`/`navigate`/`toggle`/`call-service`/`fire-dom-event` | `more-info` | v0.2.0 (`more-info`/`url`) v0.3.0 (`navigate`/`toggle`/`call-service`/`fire-dom-event`) | Action to perform.                                                              |
| entity           |                                string                                 |             |                                         v0.3.0                                          | (Only for `more-info`) Override the entity for more information.                |
| navigation_path  |                                string                                 |             |                                         v0.3.0                                          | (Only for `navigate`) Path to navigate to (e.g. `/lovelace/0/`).                |
| ~~url~~ url_path |                                string                                 |             |                                    ~~v0.2.0~~ v0.3.0                                    | (Only for `url`) URL to open.                                                   |
| service          |                                string                                 |             |                                         v0.3.0                                          | (Only for `call-service`) Service to call.                                      |
| service-data     |                                string                                 |             |                                         v0.3.0                                          | (Only for `call-service`) Service data to include.                              |
| haptic           |  `success`/`warning`/`failure`/`light`/`medium`/`heavy`/`selection`   |             |                                         v0.3.0                                          | Haptic feedback for the [Beta IOS App].(https://www.home-assistant.io/ios/beta) |
| confirmation     |                                object                                 |             |                                         v0.3.0                                          | Display a confirmation popup.                                                   |

**Parent key:** `tap_action.confirmation`

| Name       | Type / Options | Default | Since  | Description                                                          |
| ---------- | :------------: | :-----: | :----: | -------------------------------------------------------------------- |
| text       |     string     |         | v0.3.0 | This text will be displayed in the popup.                            |
| exemptions |     array      |         | v0.3.0 | Any user declared in this list will not see the confirmation dialog. |

### Alignment config

**Parent key:** `alignment`

| Name          |          Type / Options          | Default  | Since  | Description                                            |
| ------------- | :------------------------------: | :------: | :----: | ------------------------------------------------------ |
| header        | `left`/`right`/`center`/`spaced` | `spaced` | v0.2.0 | Select the spacing strategy between title and icon.    |
| icon_first    |          `true`/`false`          | `false`  | v0.2.0 | Set the icon before the title.                         |
| status        | `left`/`right`/`center`/`spaced` | `spaced` | v0.2.0 | Select the spacing strategy between state and tooltip. |
| tooltip_first |          `true`/`false`          | `false`  | v0.2.0 | Set the tooltip before the status.                     |

### Blink config

**Parent key:** `blink`

| Name   |         Type / Options         | Default | Since  | Description                                                |
| ------ | :----------------------------: | :-----: | :----: | ---------------------------------------------------------- |
| effect |        `fade`/`shadow`         |         | v0.4.0 | The blink effect (`shadow` only works with `card` target). |
| target | `card`/`status`/`title`/`icon` |         | v0.4.0 | Set the component to blink.                                |
| speed  |             number             |         | v0.4.0 | The animation speed.                                       |

### Initialisation config

**Parent key:** `init`

| Name      |         Type / Options          | Default | Since  | Description                                                                                                |
| --------- | :-----------------------------: | :-----: | :----: | ---------------------------------------------------------------------------------------------------------- |
| animation | `none`/`raise`/`slide`/`reveal` | `raise` | v0.9.0 | The initialization animation **[More info](https://github.com/dylandoamaral/uptime-card#initialization)**. |
| duration  |             number              |   0.5   | v0.9.0 | The initialization animation duration.                                                                     |

### Clipping config

**Parent key:** `clip`

| Name   | Type / Options | Default |  Since  | Description                                   |
| ------ | :------------: | :-----: | :-----: | --------------------------------------------- |
| title  |     number     |   25    | v0.11.0 | The max length of the title before clipping.  |
| status |     number     |   25    | v0.11.0 | The max length of the status before clipping. |

### Duration config

**Parent key:** `duration`

| Name     |               Type / Options                | Default |  Since  | Description                                     |
| -------- | :-----------------------------------------: | :-----: | :-----: | ----------------------------------------------- |
| quantity |                   number                    |   24    | v0.16.0 | The quantity of the total duration of the card. |
| unit     | `minute`/`hour`/`day`/`week`/`month`/`year` | `hour`  | v0.16.0 | The unit of the total duration of the card.     |

## Examples 📊

### Example 1

<p align="center">
  <img src="https://raw.githubusercontent.com/dylandoamaral/uptime-card/main/images/example_1.png" />
</p>

```yaml
type: 'custom:uptime-card'
entity: binary_sensor.updater
icon: 'mdi:raspberry-pi'
title_template: HA update
status_adaptive_color: true
alias:
  ok: Update available !
  ko: No update for the moment...
color:
  icon: grey
show:
  footer: false
duration:
  quantity: 1
  unit: week
```

### Example 2

<p align="center">
  <img src="https://raw.githubusercontent.com/dylandoamaral/uptime-card/main/images/example_2.png" />
</p>

```yaml
type: 'custom:uptime-card'
entity: sun.sun
title_template: Sun
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
duration:
  quantity: 1
  unit: day
```

### Example 3

<p align="center">
  <img src="https://raw.githubusercontent.com/dylandoamaral/uptime-card/main/images/example_3.png" />
</p>

```yaml
type: 'custom:uptime-card'
entity: binary_sensor.ping_google
# Home Assistant ping integration - https://www.home-assistant.io/integrations/ping
title_template: 'https://www.google.com/'
icon: 'mdi:heart'
title_adaptive_color: true
average_template: '[[[ return variables.uptime.toFixed(2); ]]]% uptime'
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
  url_path: 'https://www.google.com/'
alignment:
  status: spaced
  header: center
duration:
  quantity: 3
  unit: day
```

## Additional information ℹ️

### `ok` and `ko` options

For non binary sensors, the uptime card will be in `unknown` state because the card cannot ascertain whether it's state corresponds to `ok` or `ko`.

These can be indiviually specified with either `ok` or `ko`.

The `none` state mapping could be used if you need to consider some states as unknown. For example, if your sensor has `on`, `off`, `unknown` and `unavailable` state values, you can pass `[unknown, unavailable]` to `none` and those states will be visible as `unknonw`.

These options follow these rules:

- if ok is not defined and ko is not defined -> `unknown`
- if ok is defined and ko is not defined:
  - if the state name equals ok -> `ok`
  - if the state name equals none -> `unknown`
  - if not -> `ko`
- if ok is not defined and ko is defined:
  - if the state name equals ko -> `ko`
  - if the state name equals none -> `unknown`
  - if not -> `ok`
- if ok is defined and ko is defined:
  - if the state name equals ok -> `ok`
  - if the state name equals ko -> `ko`
  - if not -> `unknown`

### Color thresholds

You can specify the color of the bars using `color.ok`, `color.ko`, `color.half` and the `severity`, however you can have only three colors for your bars and you can't control them as much as you may want. That's the reason why `color_thresholds` exists.

You can specify `color_thresholds` to erase the `color.ok`, `color.ko`, `color.half` behaviour by specifing a list of thresholds with the following data structure:

| Name  | Type / Options | Default | Since  | Description                                                             |
| ----- | :------------: | :-----: | :----: | ----------------------------------------------------------------------- |
| value |     number     |         | v0.4.0 | Threshold value.                                                        |
| color |     string     |         | v0.4.0 | CSS color which will be used for levels below or equal the value field. |

#### Example:

```yaml
color_thresholds:
  - value: 20
    color: red
  - value: 40
    color: blue
  - value: 60
    color: orange
  - value: 100
    color: green
```

With the above configuration, if the uptime of the current bar is less or equal than 20 then the bar will be red or else if it is less or equal than 40 then the bar will be blue and so on. The repartition looks like:

```
|________]________]________]________]
0        20       40       60      100
    red     blue    orange    green
```

## Initialization

Since `v0.9.0` you can customize the initialization animation.

You have three choices:

### Raise

<p align="center">
  <img src="https://raw.githubusercontent.com/dylandoamaral/uptime-card/main/images/animation_raise.gif" />
</p>

### Reveal

<p align="center">
  <img src="https://raw.githubusercontent.com/dylandoamaral/uptime-card/main/images/animation_reveal.gif" />
</p>

### Slide

<p align="center">
  <img src="https://raw.githubusercontent.com/dylandoamaral/uptime-card/main/images/animation_slide.gif" />
</p>

## Templating

Custom templates can be used to customize the displayed text of `status`, `average` and `tooltip`.

Generally speaking, templates allows the ability to print either current values from the sensor or special variables, available either for the status or the tooltip.

Either generic or specific interpolations exist using `[[[ my.function ]]]` structure.

Under the hood, since v0.5.0, it uses the javascript [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Function). It allows you to freely customize the fields using javascripts.

### Generic interpolations

By default, for both all templates you can print sensor data using the variable `entity`.

For example, using sensor `sun.sun` has the following `attributes`:

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

The attribute `friendly_name` can be used using template, `[[[ return entity.attributes.friendly_name ]]]`.

Since `v0.7.0`, you can get the yaml card configuration inside the template using the variable `configuration`.

As an example, you can print the average uptime as `HH:MM:SS` instead of the average pourcentage using the following code in `average_template`:

```js
[[[
let date = new Date(0);
seconds = Math.trunc((configuration.duration.quantity * 3600 * 24) * variables.uptime / 100);
date.setSeconds(seconds);
return date.toISOString().substr(11, 8)
]]]
```

### Specific interpolations

By default some templates has their own interpolations using the variable `variables`.

#### `Status`

`status` has the following interpolations:

- `[[[ return variables.current ]]]`: the current status.
- `[[[ return variables.ok ]]]`: the `ok` status.
- `[[[ return variables.ko ]]]`: the `ko` status.

#### `Tooltip`

`tooltip` has the following interpolations:

- `[[[ return variables.from_date ]]]`: the start date of the bar.
- `[[[ return variables.to_date ]]]`: the end date of the bar.
- `[[[ return variables.average ]]]`: the percentage of `on` during the period.

#### Example

These can be combined to create a sentence.

As an example, to retrieve the status of a `sun.sun` entity, template `[[[ return entity.attributes.friendly_name ]]] is [[[ return variables.current ]]]` can be specified.

Which will print `Sun is Above Horizon` (if the sensor is in `ok` state and if alias is `Above Horizon`.)

### Contribution

Don't hesitate to ask for features or to contribute by yourself ⭐.

## For developers 👨‍💻

If you want to add a feature or fix a bug by yourself, follow these instructions:

1. Open the project inside a [devcontainer](https://code.visualstudio.com/docs/remote/containers).
2. Run `npm start`.
3. Open the browser and go to `http://localhost:8123/`.
4. Make changes and see the changes into the home assistant instance.

### Inspiration

This repository is inspired by two other cards, [mini-graph-card](https://github.com/kalkih/mini-graph-card) and [boilerplate-card](https://github.com/custom-cards/boilerplate-card).
