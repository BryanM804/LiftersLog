# Changelog

Future Changes will be documented here

## Alpha [0.2.0] - 00/00/25
### General
- Site can now be installed as a PWA app
- Various UI elements should now scale better on different devices
- Various menus adjusted for better usability on mobile devices

### Profile
- Adjusted UI
- Changed Cardio Time to display in hours and minutes instead of only minutes

### Logging
- Added a sync button that can be toggled to sync the inputs for weight and reps of split movements

### Chat
- Chat now utilizes websockets (like it always should have) and is now significantly more responsive
- Added the ability to reply to another user's message in chat rooms
- Added the ability to reply to a friend's activity in chat rooms if they are a member of the room
- Added the ability to ping other users in chat
- Added push noifications which can be toggled for replies and pings in chat (You must manually add the site to home screen on iOS for this to work)
- Redesigned the visuals for the chat

## Alpha [0.1.3] - 6/14/25
### Insights
- Actually fixed graph timeframes
- Graphs now show 1 line for each side of split movements
### Logging
- Increased XP orb amount

## Alpha [0.1.2] - 6/13/25
### Login
- Fixed randomly logging out when navigating between pages due to relogging in after being logged out from timeout
- Remember me now remembers you
### Insights
- Fixed graph timeframe dropdown not changing automatically when switching between user chart and movement chart

## Alpha [0.1.1] - 6/10/2025

### History 
- Fixed saving an unchanged label on an already labeled date duplicating the label activity
### Insights
- Fixed graph title not updating when you change movement
- Fixed graph titles intersecting if the graph title extended to 2 lines
- Graph timeframe and metric dropdowns now save the last picked option when you navigate to other pages
- Added elapsed cardio time card
- All user stat cards are now affected by the selected timeframe
- Typical Rep Range is now affected by the selected timeframe
### Friends
- Fixed last seen dates always saying Unknown
- Fixed friend cards not staying expanded when you navigate off the friends screen 

## Alpha [0.1.0] - 6/9/2025
### Release
Initital release with the following basic features:
- Logging
  - Log Lifts
  - Log Cardio
  - Add/View notes for movements
    - Add/View sticky notes to movements that reappear for any date
  - See recent history for the active date
- History
  - Navigate through dates to see previous logged items
  - Set labels for dates
  - Jump to any entered date (hold either directional button)
  - Filter dates for only dates that include a certain movement
- Insights
  - Shows user insights (when no movement is selected)
    - Radar chart shows set distribution for each muscle group
    - Stat cards for various overall stats
  - Movement Insights (when movement selected)
    - Graph median set total, best set, and max weight used over various timeframes
    - Stat cards for various statistics for selected movement
- Social
  - Basic chat functionality
  - Global chatroom
  - User Created private chatrooms (1 per user)
  - Friends
    - Add/Remove friends
    - Expand friend cards to see recent activity (if set to public)
    - View friend profiles by clicking their profile picture
- Profile
  - View general profile statistics
  - View/Change max lift records and bodyweight
  - Change user profile picture
  - Change user preferences
    - Private/Public Activity
    - Splitting/Combining movements