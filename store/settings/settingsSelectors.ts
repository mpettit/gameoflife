import { RootState } from "../store";
import { GameOfLifeSettingsState } from "./settingsReducer";

export function getSettings(state: RootState): GameOfLifeSettingsState {
    return state.settings;
}