FROM ruby:3.2.2-slim-bullseye

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential curl git libpq-dev \
    && apt-get update && apt-get install -y --no-install-recommends nodejs yarn \
    && rm -rf /var/lib/apt/lists/* /usr/share/doc /usr/share/man \
    && apt-get clean

WORKDIR /api
COPY . .
COPY Gemfile /api/Gemfile
COPY Gemfile.lock /api/Gemfile.lock
RUN bundle install

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Configure the main process to run when running the image
CMD ["rails", "server", "-b", "0.0.0.0"]