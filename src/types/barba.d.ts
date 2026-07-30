declare module "@barba/core" {
  interface BarbaPage {
    container: HTMLElement | null;
    html: string;
    namespace?: string;
    url?: {
      hash?: string;
    };
  }

  interface BarbaData {
    current: BarbaPage;
    next: BarbaPage;
    trigger?: EventTarget | string;
  }

  type BarbaHook = (data: BarbaData) => unknown;

  interface BarbaTransition {
    name?: string;
    once?: BarbaHook;
    before?: BarbaHook;
    beforeLeave?: BarbaHook;
    leave?: BarbaHook;
    afterLeave?: BarbaHook;
    beforeEnter?: BarbaHook;
    enter?: BarbaHook;
    afterEnter?: BarbaHook;
    after?: BarbaHook;
  }

  interface BarbaOptions {
    preventRunning?: boolean;
    timeout?: number;
    transitions?: BarbaTransition[];
  }

  const barba: {
    init(options?: BarbaOptions): void;
    hooks: {
      afterOnce(callback: () => void): void;
    };
  };

  export default barba;
}
