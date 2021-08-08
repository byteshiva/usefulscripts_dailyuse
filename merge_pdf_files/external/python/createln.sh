#!/bin/bash
pushd $1 
if [ -e pdfc ]
then
    echo "pdfc exits[symlink for pdf_compressor exits]"
else
    echo "creating symlink for pdf_compressor.."
    ln -s pdf_compressor.py pdfc
fi
popd
