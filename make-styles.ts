/**
 * Types definitions
 * - copied from material-ui
 * - adopted for current project
 * - needed for development autocomplete */
import * as CSS from "csstype";
import { useMemo } from "react";
import { Theme, useTheme } from "@emotion/react";
import { css } from "@emotion/css";

type TStyles<Props extends object, ClassKey extends string = string> = (
    | TStyleRules<Props, ClassKey>
    | TStyleRulesCallback<Props, ClassKey>
);

type TStyleRules<Props extends object = {}, ClassKey extends string = string> = Record<
    ClassKey,
    CSSProperties | CreateCSSProperties<Props> | PropsFunc<Props, CreateCSSProperties<Props>>
>;

interface CSSProperties extends BaseCSSProperties {
    [k: string]: (
        | unknown
        | CSSProperties
    );
}

interface BaseCSSProperties extends JSSNormalCssProperties {
    "@font-face"?: (
        | JSSFontFace
        | JSSFontFace[]
    );
}

type BaseCreateCSSProperties<Props extends object = {}> = {
    [P in keyof BaseCSSProperties]: (
        | BaseCSSProperties[P]
        | PropsFunc<Props, BaseCSSProperties[P]>
    );
};

type JSSNormalCssProperties = CSS.Properties<number | string>;

type JSSFontFace = CSS.AtRule.FontFace & {
    fallbacks?: CSS.AtRule.FontFace[];
};

interface CreateCSSProperties<Props extends object = {}> extends BaseCreateCSSProperties<Props> {
    [k: string]: (
        | BaseCreateCSSProperties<Props>[keyof BaseCreateCSSProperties<Props>]
        | CreateCSSProperties<Props>
    );
}

export type PropsFunc<Props extends object, T> = (props: Props) => T;

type TStyleRulesCallback<Props extends object, ClassKey extends string = string> = (
    theme: Theme,
) => TStyleRules<Props, ClassKey>;

type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

function makeStyles<Props extends object = {}, ClassKey extends string = string>(
    config: TStyles<Props, ClassKey>,
): keyof Props extends never
    ? (props?: never) => ClassNameMap<ClassKey>
    : (props: Props) => ClassNameMap<ClassKey> {
    return (props) => useClasses(props, config);
}

function useClasses(props, config) {
    const theme: Theme = useTheme();

    return useMemo(() => {
        const rawClasses = typeof config === "function" ? config(theme) : config;

        return Object.entries(rawClasses).reduce((classes, [className, rawClassValue]) => {
            const classValue = typeof rawClassValue === "function" ? rawClassValue(props) : rawClassValue ?? {};
            const values = Object.entries(classValue).reduce((styles, [styleName, styleValue]) => {
                styles[styleName] = typeof styleValue === "function" ? styleValue(props) : styleValue;

                return styles;
            }, {});

            classes[className] = css(values);

            return classes;
        }, {});
    }, [config, props, theme]);
}

export default makeStyles;
