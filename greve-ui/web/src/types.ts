// positioning.
export type Position =
  | 'center'
  | 'bottom'
  | 'left-center'
  | 'right-center'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface OpenMessage {
  action: 'open';
  title: string;
  content?: string;
  position?: Position;
}

export interface CloseMessage {
  action: 'close';
}

export type NuiMessage = OpenMessage | CloseMessage;
