const { replace } = require( '@automattic/vip-search-replace' );
const fs = require( 'fs' );
const config = require( './config' );

const filename = config.innerFile;
const lastDotIndex = filename.lastIndexOf('.');
const name = filename.substring(0, lastDotIndex);
const extension = filename.substring(lastDotIndex + 1);


const stringToReplace = config.string;
const newString = config.newString;


// Create a readable and writeable stream. Can be any stream: File, std, etc...
(async() => {
    const readableStream = fs.createReadStream( filename );
    const writeableStream = fs.createWriteStream( `${name}_replaced.${extension}`, { encoding: 'utf8' } );
    
    const result = await replace( readableStream, [ stringToReplace, newString,  ] );
    result.pipe( writeableStream );
})()
