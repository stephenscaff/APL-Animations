# APL Animations

A package of plugin and play animations for APL, using the [`animateItem`](https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-standard-commands.html#animate_item_command) command.

Most of these animations deal with simple entrances and exits.


### Build

run `node build/build` or `npm run build`.

All animations are defined in separate files in the `src` directory.
On build, a single package file of all animations is created at `dist/apl-animations`.
The animation filename becomes the command name.


### Importing as a Package

Copy the file [apl-animations.json](https://github.com/stephenscaff/APL-Animations/dist/apl-animations.json) to some publicly stored location, and import into APL as a package:

```
{
    "type": "APL",
    "version": "1.1",
    "import": [
        {
            "name": "apl-animations",
            "version": "https:/someplace.com/<path>/apl-animations.json"
        }
    ]
    ....
}
```

Of course, you can manually paste in the animations you want into an apl doc's [`commands`](https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-standard-commands.html)


### Naming

Each file in `src` indicates what the animation is/does.
During build into a single apl doc, the file name is used for the animateItem command name.

`fadeIn` indicates an opacity from 0 to 1.
`slideIn` indicates a translate minus an opacity transition.

### Naming: Combining Ups / Downs, Left / Rights

Rather than create a new animations for transitioning Up and Down, Left and Right, I've combined them and allow the `amount` param determine the direction by providing a positive or negative number.

*For Example:*

`fadeInUpDown` - on the `amount` param, negative values (`-100%`) move from 'Up', positive values (`100%`) move from 'Down'

`fadeInLeftRight` - on the `amount` param, negative values (`-100%`) move from 'Left', positive values (`100%`) move from 'Right'


### Usage

You can attach an animation directly on a Component's onMount (preferred when possible)

```
{
  "id": "someComponent",
  "type": "Container",
  "opacity": 0,
  "onMount": [
     {
         "type": "fadeInUpDown",
         "delay": 200,
         "amount": "20%",
         "easing": "cubic-bezier(0.56,1,0.59,1)"
     }
  ]
}
```

From an `onPageChange` event


```
{
  "id": "SomePager",
  "type": "Pager",
  "height": "100vh",
  "width": "100%",
  "onPageChanged": [
    {
      "type": "Parallel",
      "commands": [
        {
          "type": "fadeInUpDown",
          "componentId": "someComponentID",
          "delay": 500,
          "duration": 500,
          "amount": "110%",
          "easing": "cubic-bezier(0.5,1.5,0.5,1)"
        },
        ...
    }
  ]
}
```

Or, on `onMount`

```
[
  onMount: [
  {
    "type": "Parallel",
    "commands": [
      {
        "type": "fadeInUpDown",
        "componentId": "someComponentID",
        "delay": 500,
        "duration": 500,
        "amount": "110%",
        "easing": "cubic-bezier(0.5,1.5,0.5,1)"
      },
      ...
    }
  ]
]
```

### Component ID

All animations include a parameter for `componentId`. While defining `componentId` is technically optional since if omitted, the component issuing the AnimateItem command is used.
However, if you are calling the animation from `onMount` or `onPageChanged`, the animation won't trigger unless `componentId` is defined.

So, it makes sense to always define `componentId`, even when attaching an animation direction onto a component.

[See Spec for more info](https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-standard-commands.html#animate_item_command)


### Easings

All animations have an `easings` parameter, so you can defined a custom easing.

*Looking for Easings package?*

Here's one that convert's Robert Penner's easing functions as cubic-bezier:

[APL-Easings](https://github.com/stephenscaff/APL-Easings)
