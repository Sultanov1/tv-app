import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi.ts";
import {RootState} from "../app/store.ts";

export interface Show {
    id: string;
    name: string;
    summary: string;
    image: string;
}

export interface ShowState {
    show: Show | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: ShowState = {
    show: null,
    isLoading: false,
    error: null,
};

export const fetchDetails = createAsyncThunk<Show, string, {state: RootState}>('show/fetchDetails', async (id: string) => {
    const {data: show} = await axiosApi.get<Show>(`http://api.tvmaze.com/shows/${id}`);
    return show;
});

export const showSlice = createSlice({
    name: "show",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.show = action.payload;
            })
            .addCase(fetchDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ?? 'Failed to fetch shows';
            });
    }
});


export const selectShows = (state: RootState) => state.search.shows;
export const showReducer = showSlice.reducer;