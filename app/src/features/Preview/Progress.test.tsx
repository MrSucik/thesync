import React from "react";
// import { rest } from "msw";
// import { setupServer } from "msw/node";
import { render, screen, waitFor } from "../../utils/tests";
import Progress from "./Progress";
// const server = setupServer(
//   rest.get(
//     "http://localhost/webapi/menu/notificationsdetails",
//     (request, response, context) => {
//       return response(
//         context.delay(1000),
//         context.json({ SubitemsData: {}, Subitems: [] })
//       );
//     }
//   )
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

test("NotificationCenter component renders", async () => {
  render(<Progress duration={3} state="running" />);

  expect(screen.getByLabelText("last-updated-label")).toHaveTextContent(
    "Last updated:"
  );
});
