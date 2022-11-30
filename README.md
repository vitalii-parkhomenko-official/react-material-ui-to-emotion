# React Material UI to Emotion

The task is migration from using of `material-ui` to `@emotion`

The migration doesn't look too complex

According to this code snipped just need to create `makeStyles` function with the same interface as it in material-ui

In real life tested with migration from material-ui@4.x.x to @emotion@11.x.x

The dependencies of emotion:
- @emotion/css@11.10.0 
- @emotion/react@11.10.0
- csstype@3.0.8 (in case you need to support typescript)

```jsx
// In your app file
import { ThemeProvider } from "./index";

// ...
const theme = light|dark;

<ThemeProvider theme={theme}>
  <App />
<ThemeProvider>

// In you style file use as regular materia-ui makeStyles
import { makeStyles } from "./index";

const useStyles = makeStyles({
  className: {
    cssProperty: cssValue
  }
});

const useStyles = makeStyles((theme) => ({
  className: {
    cssProperty: cssValue
  }
}));

const useStyles = makeStyles((theme) => ({
  className(props) {
    return {
      cssProperty: cssValue  
    };
  }
}));

const useStyles = makeStyles((theme) => ({
  className: {
    cssProperty(props) {
      return cssValue;  
    } 
  }
}));

// ...

function Component(props) {
  const classes = useStyles();

  // or with props
  const classes = useStyles(props);

  return <JSX className={classes.className}>;
}
```
