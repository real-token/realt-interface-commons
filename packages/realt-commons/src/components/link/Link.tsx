import { forwardRef } from "react";

interface LinkProps extends Omit<React.ComponentPropsWithoutRef<'a'>, 'href' | 'as'>{
    href: string;
    target: string;
}
export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props,ref) => {

    const {
        children,
        href, 
        target,
        ...otherProps
    } = props;

    return(
        <a
            ref={ref}
            href={href}
            target={target}
            {...otherProps}
        >
            {children}
        </a>
    )
});

Link.displayName = '@realt-commons/Link';