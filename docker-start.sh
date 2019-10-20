docker container rm -f css_watchdog
docker build -t loukas-kotas/css-watchdog .
# docker run -p 3000:3000 -d --name css_watchdog loukas-kotas/css-watchdog 

# check Dockerfile --> Runs the docker-test.js to validate the container's functionality
CUR_PATH=`pwd`
DIR="${CUR_PATH}/assets/"
if [ -d "$DIR" ]; then
### Take action if $DIR exists ###
echo "Installing config files in ${DIR}..."
docker run -p 3000:3000 -d --name css_watchdog -v ${DIR}:/src/assets/ loukas-kotas/css-watchdog
else
### Control will jump here if $DIR does NOT exists ###
echo "Error: ${DIR} not found. Can not continue."
echo "Creating  ${DIR}"
mkdir ${DIR}
docker run -p 3000:3000 -d --name css_watchdog -v ${DIR}:/src/assets/ loukas-kotas/css-watchdog
fi
