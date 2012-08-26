SHELL = /bin/bash

http:
	-@killall ruby
	@jekyll --server

copy_symlinks:
	@for file in $$(find ./source -type l); \
	do \
		dir="$$(dirname $$file)"; \
		link="$$(readlink $$file)"; \
		src="$$dir/$$link"; \
		dest="$${dir/source/output}/$$(basename $$file)"; \
		[ ! -f $$dest ] && [ -d $$(dirname $$dest) ] && cp -R $$src $$dest; \
	done;

less:
	@node ./node_modules/less/bin/lessc ./source/css/main.less ./output/css/main.css
	@rm ./output/css/*.less

install:
	@echo "Installing Dependencies for jQuery TextExt.js Documentation Site"
	@echo "You are expected to have:"
	@echo "   - Ruby 1.9.2"
	@echo "   - RVM"
	@rvm gemset create 'textext'
	@rvm gemset use 'textext'
	@gem install jekyll --no-ri --no-rdoc
	@git submodule init
	@git submodule update
	@npm install
	@echo "Success"

