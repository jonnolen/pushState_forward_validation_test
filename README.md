# Proof of Concept working with pushState

The goal is to provide push state navigation between steps of a checkout process that lives on a single page using Rails remote forms.

## Requirements:
*	A user can navigate backwards through the checkout 
	process by using the back button. The user should 
	not be taken out of the checkout process unless they click
	back from the first step of the process.
*	A user can navigate forward through the process by 
	pressing the forward button in the browser if they have
	used the back button.
*	When a user navigates forward through the checkout process
	using the browser button, the step they are currently on needs
	to validate and post to the server before the user is taken to
	the next step.  
*	If the user has made non-validating changes to the form then
	checkout process should return to the previous form and the history
	state queue should be preserved.

To run this example you need ruby gems and bundler.

From bash:

```bash
bundle; ruby server.rb;
```

Then open:
[http://localhost:4567](http://localhost:4567)


