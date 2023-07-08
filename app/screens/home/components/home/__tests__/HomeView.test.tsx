import { act, renderHook } from "@testing-library/react-hooks";
import useHomeViewModel from "../HomeViewModel";

jest.mock("../../../../../services/DbService", () => ({
  __esModule: true,
  default: [],
  saveAlarmService: jest.fn(),
  getAlarmsService: () => [{"id" : 0, "active" : false,  "time" : new Date(1), "periodicity" : ""}]

}));

import { getAlarmsService, saveAlarmService } from "../../../../../services/DbService";

it('shoud add an alarm', async () => {

  const {result, waitFor} = renderHook(() => useHomeViewModel());

  act(() => result.current.addAction({"id" : 0, "active" : false,  "time" : new Date(1), "periodicity" : ""}));

  await waitFor(() => result.current.alarms.length === 1);

  expect(saveAlarmService).toBeCalledTimes(1);

});

it('shoud open timePick dialog', async () => {

  const {result, waitFor} = renderHook(() => useHomeViewModel());

  await waitFor(() => result.current.alarms.length === 1);

  act(() => result.current.openTimePickDialog());

  expect(result.current.showTimePick).toEqual(true);

});

it('shoud load the alarms', async () => {

  const {result, waitFor} = renderHook(() => useHomeViewModel());

  await waitFor(() => result.current.alarms.length === 1);

  act(() => result.current.openTimePickDialog());

  expect(result.current.alarms).toEqual([{"id" : 0, "active" : false,  "time" : new Date(1), "periodicity" : ""}]);

});