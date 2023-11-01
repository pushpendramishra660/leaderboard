declare namespace jest {
  interface Matchers<R> {
    toHaveStyle(style: Record<string, string>): R;
  }
}
