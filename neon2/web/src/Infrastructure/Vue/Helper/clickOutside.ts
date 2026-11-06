import {onUnmounted} from "vue";
import {CurrentInstance, useCurrent} from "./currentInstance";

export function useClickOutside(once: boolean): ClickOutside {
  const clickOutside = new ClickOutside(once, useCurrent());
  onUnmounted(() => {
    clickOutside.removeAll();
  });
  return clickOutside;
}

type Runnable = () => void;
type Listener = () => void;

class ClickOutside {
  private removeLastHandler: Runnable|null = null;

  constructor(
    private once: boolean,
    private current: CurrentInstance) {
  }

  addClickListener(listener: Listener): void {
    this.removeLastHandler = this.onClickOutside(() => {
      listener();
      this.once && this.removeLastHandler && this.removeLastHandler();
    });
  }

  removeAll(): void {
    this.removeLastHandler && this.removeLastHandler();
  }

  private onClickOutside(clickedOutside: Listener): () => void {
    const {element, rootElement} = this.current;
    const windowRoot = window.document.body;

    function shadowHandler(event: Event): void {
      if (outside(element, event.target!)) {
        clickedOutside();
      }
      event.stopPropagation();
    }

    function windowHandler(event: Event): void {
      if (outside(element, event.target!)) {
        clickedOutside();
      }
    }

    rootElement!.addEventListener('click', shadowHandler);
    windowRoot!.addEventListener('click', windowHandler);
    return function (): void {
      windowRoot!.removeEventListener('click', windowHandler);
      rootElement!.removeEventListener('click', shadowHandler);
    };
  }
}

function outside(element: HTMLElement|null, target: EventTarget): boolean {
  return !element!.contains(target as Node);
}
