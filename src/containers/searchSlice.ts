import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi.ts";
import {RootState} from "../app/store.ts";

export interface Show {
    show: {
        id: string;
        name: string;
    }
}

export interface SearchState {
    shows: Show[];
    isLoading: boolean;
    error: string | null;
}

const initialState: SearchState = {
    shows: [],
    isLoading: false,
    error: null,
};

export const fetchShows = createAsyncThunk<Show[], string, {state: RootState}>('search/fetchShows', async (query: string) => {
    const {data: show} = await  axiosApi.get<Show[]>(`http://api.tvmaze.com/search/shows?q=${query}`);
    return show;
});


export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShows.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchShows.fulfilled, (state, action) => {
                state.isLoading = false;
                state.shows = action.payload;
            })
            .addCase(fetchShows.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ?? 'Failed to fetch shows';
            });
    }
});

export const searchReducer = searchSlice.reducer;