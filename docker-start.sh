docker container stop css_watchdog
docker container rm css_watchdog
docker build -t loukas-kotas/css-watchdog .
# docker run -p 3000:3000 -d --name css_watchdog loukas-kotas/css-watchdog 

# check Dockerfile --> Runs the docker-test.js to validate the container's functionality

DIR="assets/"
if [ -d "$DIR" ]; then
### Take action if $DIR exists ###
echo "Installing config files in ${DIR}..."
docker run -p 3000:3000 -d --name css_watchdog loukas-kotas/css-watchdog 
else
### Control will jump here if $DIR does NOT exists ###
echo "Error: ${DIR} not found. Can not continue."
echo "Creating  ${DIR}"
mkdir ${DIR}
docker run -p 3000:3000 -d --name css_watchdog loukas-kotas/css-watchdog 
fi

docker cp css_watchdog:/src/assets/ assets/