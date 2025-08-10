import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch resume count from API
export const fetchResumeCount = createAsyncThunk(
  'resume/fetchResumeCount',
  async () => {
    const res = await fetch('/api/resume');
    const data = await res.json();
    console.log(data);
    return data.resumes.length;
  }
);

const resumeSlice = createSlice({
  name: 'resume',
  initialState: { count: 0 },
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchResumeCount.fulfilled, (state, action) => {
      state.count = action.payload;
    });
  },
});

export const { setCount } = resumeSlice.actions;
export default resumeSlice.reducer;