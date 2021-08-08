Merge pdf files

### Before executing Makefile
Make sure to execute
on external/python/ directory  

or write a small shell script

```
  $touch createsym.sh
  $chmod 777 createsy.sh
```

```
  pushd ./external/python/
  ln -s pdf_creator.py pdfc
  popd
```
