NODE=node
FILENAME=index.js
COMPRESS=./external/python/pdfc  -o $(OUTFILE) -c 3 $(INPUTFILE)

# execute pdf merge
run:
	@echo "\n==> execue merge pd"
	$(NODE) $(FILENAME)

compress:
	@echo "\n==> compress pdf"
	$(COMPRESS)
