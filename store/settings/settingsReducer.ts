import { GameOfLifeSettings } from '../../models/game-of-life-settings';
import { AnyAction } from 'redux';
import { GameOfLifeSettingsAction } from './settingsActions';

export interface GameOfLifeSettingsState extends GameOfLifeSettings {
    isLoaded: boolean;
}

const initialState: GameOfLifeSettingsState = {
    cellSettings: {},
    isLoaded: false,
};

// Use the initialState as a default value
export default function settingsReducer(state = initialState, action: AnyAction): GameOfLifeSettingsState {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        // Do something here based on the different types of actions
        case GameOfLifeSettingsAction.SetSettings:
            return {
                ...state,
                ...action.payload,
                isLoaded: true,
            };
        default:
            // If this reducer doesn't recognize the action type, or doesn't
            // care about this specific action, return the existing state unchanged
            return state;
    }
}
