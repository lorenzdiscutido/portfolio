import "@testing-library/jest-dom";

if (typeof HTMLCanvasElement !== "undefined") {
  HTMLCanvasElement.prototype.getContext = (() => {
    return {
      clearRect: () => {},
      createRadialGradient: () => ({
        addColorStop: () => {},
      }),
      beginPath: () => {},
      arc: () => {},
      fill: () => {},
      fillStyle: "",
    };
  }) as unknown as typeof HTMLCanvasElement.prototype.getContext;
}

if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
  class MockIntersectionObserver {
    root: Element | Document | null = null;
    rootMargin: string = "0px";
    thresholds: ReadonlyArray<number> = [0];

    constructor(_callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
      if (options?.rootMargin) {
        this.rootMargin = options.rootMargin;
        // Enforce W3C specification: rootMargin must strictly be px or % units
        const tokens = options.rootMargin.trim().split(/\s+/);
        for (const token of tokens) {
          if (!/^-?\d+(\.\d+)?(px|%)$/.test(token)) {
            throw new SyntaxError(
              `Failed to construct 'IntersectionObserver': rootMargin must be specified in absolute length units or percent. Got '${token}'`
            );
          }
        }
      }
    }

    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  (window as unknown as { IntersectionObserver: typeof MockIntersectionObserver }).IntersectionObserver =
    MockIntersectionObserver;
}

// Mock @lucasmarkes/hairline/react for Jest test runs (pure ESM package)
jest.mock("@lucasmarkes/hairline/react", () => {
  const React = require("react");
  return new Proxy(
    {},
    {
      get: (_target, prop) => {
        const MockComponent = (props: Record<string, unknown>) =>
          React.createElement("div", {
            "data-testid": `hairline-${String(prop).toLowerCase()}`,
            ...props,
          });
        MockComponent.displayName = `Hairline.${String(prop)}`;
        return MockComponent;
      },
    }
  );
});


