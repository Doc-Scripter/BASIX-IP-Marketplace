SHELL := /bin/bash

.PHONY: all run clean frontend backend virtual-environment



help:
	@echo "Usage: make [target]"
	@echo "Targets:"
	@echo "  all        		    Builds the frontend and sets up/runs the backend."
	@echo "  frontend  			    Builds the frontend."
	@echo "  backend    			Sets up and runs the backend."
	@echo "  clean      		    Cleans up generated files."
	@echo "  virtual-environment 	Sets up the virtual environment."
all: frontend backend

run :
	virtual-environment frontend backend
	@echo "Running the application..."
	@echo "Open http://localhost:5000 in your browser."

frontend:
	cd frontend && \
	npm install && \
	npm run build
backend:
	@echo "Running backend..."
	cd backend && \
	source .venv/bin/activate && \
	pip install -r requirements.txt && \
	flask run || exit 1
virtual-environment:
	@echo "Setting up virtual environment..."
	cd backend && \
	python3 -m venv .venv && \
	source .venv/bin/activate && \
	pip install -r requirements.txt
clean:
	@echo "Cleaning up..."
	@rm -f app.db