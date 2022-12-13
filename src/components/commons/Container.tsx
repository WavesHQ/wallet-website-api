import { PropsWithChildren } from "react";
import clsx from "clsx";

/**
 * Container implementation that is part of the design language.
 */
export default function Container(
  props: PropsWithChildren<{ className?: string }>
): JSX.Element {
  return (
    <div
      className={clsx(
        "container mx-auto px-4 sm:px-6 lg:px-10",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
