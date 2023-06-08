import React from "react";
import { Point, point, Pointish } from "@coord/core";
import { useMemo } from "react";
import { withGraphContext, parametricAdaptiveSampling } from "@/utils";
import { PolyLineProps, PolyLine } from "./PolyLine";

export interface PlotParametricProps extends Omit<PolyLineProps, "points"> {
  domain: [number, number];
  f: (t: number) => Pointish;
  errorTolerance?: number;
  minSamplesDepth?: number;
  maxSamplesDepth?: number;
}

const Parametric = withGraphContext(
  ({
    domain,
    f,
    errorTolerance = 0.01,
    minSamplesDepth = 8,
    maxSamplesDepth = 9,

    strokeWidth = 3,
    ...rest
  }: PlotParametricProps) => {
    const points = useMemo(
      () =>
        parametricAdaptiveSampling(
          domain,
          (t: number) => Point.of(f(t)),
          errorTolerance,
          minSamplesDepth,
          maxSamplesDepth
        ),
      [domain, errorTolerance, maxSamplesDepth, minSamplesDepth, f]
    );

    return <PolyLine points={points} strokeWidth={strokeWidth} {...rest} />;
  }
);
export type OfXProps = {
  domain?: [number, number];
  f: (x: number) => number;
} & Omit<PlotParametricProps, "f" | "domain">;

const OfX = withGraphContext(({ f, domain, context, ...rest }: OfXProps) => {
  return (
    <Parametric
      domain={domain ?? context.coordBox.horizontal.toArray()}
      f={(x) => point(x, f(x))}
      context={context}
      {...rest}
    />
  );
});

export type OfYProps = {
  domain?: [number, number];
  f: (y: number) => number;
} & Omit<PlotParametricProps, "f" | "domain">;

const OfY = withGraphContext(({ f, domain, context, ...rest }: OfYProps) => {
  return (
    <Parametric
      domain={domain ?? context.coordBox.vertical.toArray()}
      context={context}
      f={(y) => point(f(y), y)}
      {...rest}
    />
  );
});

export const Plot = {
  Parametric,
  ofX: OfX,
  ofY: OfY,
};
