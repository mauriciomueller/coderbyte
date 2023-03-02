# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here


### Ticket 1: Add a new field for custom Agent IDs

**Acceptance Criteria:**

- A PR has been submitted to our repo on a feature branch containing the necessary code modifications.
- Test case(s) have been created for the following use case(s):
  - A new table named "AgentExternalIDs" has been created in the database.
  - The table has two bigint columns: "AgentID" and "ExternalAgentID".
  - A foreign key “FK_Agents_AgentExternalID_AgentExternalIDs_ExternalAgentID” has been created.
  - A index “idx_external_agent_id” has been created.
- Upon deployment to each respective environment, successful test runs for these use cases have been executed and attached to this ticket. Proof of implementation has been supplied as a successful run.

**Time/Effort Estimate:** 3 hours

**Implementation Details:**
- Use migration to create a new table named "AgentExternalIDs"
- Create two columns: "AgentID" and "ExternalAgentID".
- Create a foreign key “FK_Agents_AgentExternalID_AgentExternalIDs_ExternalAgentID”
- Create an index “idx_external_agent_id” for the column “ExternalAgentID”

**Additional information:**
- “ExternalAgentID” will be used to allow Facilities to input custom Agent IDs and it will be used in Report generation.

### Ticket 2: Allow Facilities to input custom Agent IDs

**Acceptance Criteria:**

- A PR has been submitted to our repo on a feature branch containing the necessary code modifications.
- Test case(s) have been created for the following use case(s):
  - Facilities can input a custom Agent ID for each Agent they work with through the platform's UI.
  - This ID is saved to the database table "AgentExternalIDs" and associated with the corresponding Agent ID record.
- Upon deployment to each respective environment, successful test runs for these use cases have been executed and attached to this ticket. Proof of implementation has been supplied as a successful run.


**Time/Effort Estimate:** 8 hours

**Implementation Details:**

- Add a new input field to the UI for Facilities to input custom Agent IDs.
- Upon submission of the form, save the custom Agent ID and corresponding Agent ID to the "AgentExternalIDs" table in the database.
- Add appropriate validation checks to ensure that the custom Agent ID inputted by Facilities is unique and adheres to any formatting requirements specified by the system.
- Add appropriate error handling to handle any issues that may arise during the process of saving the custom Agent ID to the database.

### Ticket 3: Use custom Agent IDs in report generation

**Acceptance Criteria:**
- A PR has been submitted to our repo on a feature branch containing the necessary code modifications.
- Test case(s) have been created for the following use case(s)
  - When generating reports for Facilities:
    - The custom Agent IDs inputted by Facilities are used instead of the internal database IDs for each Agent.
    - The internal Agent IDs is used if the custom Agent IDs is not provided
    - Upon deployment to each respective environment, successful test runs for these use cases have been executed and attached to this ticket. Proof of implementation has been supplied as a successful run.

**Time/Effort Estimate:** 6 hours

**Implementation Details:**

- The generateReport function will need to be modified to use the custom Agent IDs inputted by Facilities when generating reports.
- Update any relevant code that interacts with the Agents table to retrieve the custom Agent IDs instead of the internal database IDs.