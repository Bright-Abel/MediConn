import { Appointment } from '@/types/appwrite.type';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDoctors } from '@/lib/actions/doctor.action';
import { DoctorParams } from '@/types';

export const fetchAllDoctor = createAsyncThunk('doctors/fetchAll', async () => {
  const allDoc = await getDoctors();
  return allDoc;
});

interface InitialStateProperties {
  isSidebarOpen: boolean;
  autoPassword: string | undefined;
  dashboardSidebar: boolean;
  getAppointmentType: string;
  userAppointment: Appointment[];
  isAppointmentInfoSidebar: boolean;
  singleAppointment: Appointment[];
  allDoc: DoctorParams[];
}

const initialState: InitialStateProperties = {
  isSidebarOpen: false,
  autoPassword: '',
  dashboardSidebar: false,
  getAppointmentType: 'scheduled',
  userAppointment: [],
  isAppointmentInfoSidebar: false,
  singleAppointment: [],
  allDoc: [],
};

const featureSlice = createSlice({
  name: 'slices',
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    openDashboardSidebar: (state) => {
      state.dashboardSidebar = !state.dashboardSidebar;
    },
    autoPasswordGenerate: (state) => {
      const length = 16; // Minimum length
      const lowercase = 'abcdefghijklmnopqrstuvwxyz';
      const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numbers = '0123456789';
      const specialCharacters = '[!@#$%^&*(),.?":{}|<>]';
      const allCharacters = lowercase + uppercase + numbers + specialCharacters;

      let password = '';
      password += lowercase[Math.floor(Math.random() * lowercase.length)];
      password += uppercase[Math.floor(Math.random() * uppercase.length)];
      password += numbers[Math.floor(Math.random() * numbers.length)];
      password +=
        specialCharacters[Math.floor(Math.random() * specialCharacters.length)];

      // Filling the rest of the password with random characters
      for (let i = password.length; i < length; i++) {
        password +=
          allCharacters[Math.floor(Math.random() * allCharacters.length)];
      }

      // Shuffling the password to avoid predictable patterns
      state.autoPassword = password
        .split('')
        .sort(() => 0.5 - Math.random())
        .join('');
    },
    fetchAppointmentType: (state, { payload }: PayloadAction<string>) => {
      state.getAppointmentType = payload;
    },
    appointmentType: (state, { payload }: PayloadAction<Appointment[]>) => {
      state.userAppointment = payload.filter(
        (item) => item.status === state.getAppointmentType
      );
    },
    appointmentInfoSideBar: (state) => {
      state.isAppointmentInfoSidebar = !state.isAppointmentInfoSidebar;
    },
    appointmentInfo: (state, { payload }: PayloadAction<Appointment[]>) => {
      state.singleAppointment = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllDoctor.fulfilled, (state, { payload }) => {
      state.allDoc = payload;
    });
  },
});

export const sliceReducers = featureSlice.reducer;
export const {
  openSidebar,
  autoPasswordGenerate,
  openDashboardSidebar,
  fetchAppointmentType,
  appointmentType,
  appointmentInfoSideBar,
  appointmentInfo,
} = featureSlice.actions;
