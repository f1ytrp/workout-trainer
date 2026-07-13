import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AppScreen, ErrorState } from '../design-system';

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(): State { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { if (__DEV__) console.error('App error boundary', error, info); }
  render() {
    if (!this.state.hasError) return this.props.children;
    return <AppScreen><ErrorState title="The app needs a reset" message="The screen could not load. Try again to return to the shell." onAction={() => this.setState({ hasError: false })} /></AppScreen>;
  }
}
