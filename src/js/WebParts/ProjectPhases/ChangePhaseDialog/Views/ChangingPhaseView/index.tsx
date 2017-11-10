//#region Imports
import * as React from "react";
import RESOURCE_MANAGER from "../../../../../@localization";
import { ProgressIndicator } from "office-ui-fabric-react/lib/ProgressIndicator";
import { Async } from "office-ui-fabric-react/lib/Utilities";
import IChangingPhaseViewProps from "./IChangingPhaseViewProps";
import IChangingPhaseViewState from "./IChangingPhaseViewState";
//#endregion

const INTERVAL_DELAY: number = 100;
const INTERVAL_INCREMENT: number = .01;
const RESTART_WAIT_TIME: number = 2000;

/**
 * Changing phase view
 */
export default class ChangingPhaseView extends React.Component<IChangingPhaseViewProps, IChangingPhaseViewState> {
    public static displayName = "ChangingPhaseView";
    private _interval: number;
    private _async: Async;

    /**
     * Constructor
     *
     * @param {IChangingPhaseViewProps} props Props
     */
    constructor(props: IChangingPhaseViewProps) {
        super(props);
        this.state = {
            percentComplete: 0,
        };
        this._async = new Async(this);
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        this._fakeProgress();
    }

    /**
     * Component did unmount
     */
    public componentWillUnmount(): void {
        this._async.dispose();
    }

    public render(): JSX.Element {
        let progressResKey;
        switch (this.props.phase.Type) {
            case "Gate": progressResKey = "ProjectPhases_ChangingGate";
                break;
            case "Default": progressResKey = "ProjectPhases_ChangingPhase";
                break;
        }
        const [progressLabel, progressDescription] = RESOURCE_MANAGER.getResource(progressResKey).split(",")[0];
        return (
            <ProgressIndicator
                label={progressLabel}
                description={String.format(progressDescription, this.props.phase.Name)}
                percentComplete={this.state.percentComplete} />
        );
    }


    /**
     * Fake progress using Async utility from office-ui-fabric-react/lib/Utilities
     */
    private _fakeProgress = (): void => {
        this.setState({
            percentComplete: 0,
        });
        this._interval = this._async.setInterval(() => {
            let percentComplete = this.state.percentComplete + INTERVAL_INCREMENT;
            if (percentComplete >= 1.0) {
                percentComplete = 1.0;
                this._async.clearInterval(this._interval);
                this._async.setTimeout(this._fakeProgress, RESTART_WAIT_TIME);
            }
            this.setState({
                percentComplete: percentComplete,
            });
        }, INTERVAL_DELAY);
    }
}
