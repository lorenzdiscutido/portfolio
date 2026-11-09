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
