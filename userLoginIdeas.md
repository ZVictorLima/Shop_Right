# Store User Login Plan:
* Create a unix user for each store
* Let the user ssh into the user account
* Account only has access to a docker container
* Each container stores the user's files
* This way the user only has access to their environment (User can't nuke entire server or other account's stuff)
* I recommend we ask Prof. Tao about the container deployment.