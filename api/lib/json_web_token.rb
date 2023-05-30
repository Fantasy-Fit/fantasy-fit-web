module JsonWebToken
    extend ActiveSupport::Concern
    SECRET_KEY = Rails.application.secret_key_base
    
    def jwt_encode(payload, exp = 1.minute.from_now)
        raise ArgumentError, "Payload must be a hash" unless payload.is_a?(Hash)
        raise ArgumentError, "Expiration time must be a valid time object" unless exp.respond_to?(:to_i)
        payload[:exp] = exp.to_i
        JWT.encode(payload, SECRET_KEY)
    end

    def jwt_refresh(payload, exp = 30.days.from_now)
        raise ArgumentError, "Payload must be a hash" unless payload.is_a?(Hash)
        raise ArgumentError, "Expiration time must be a valid time object" unless exp.respond_to?(:to_i)
        payload[:exp] = exp.to_i
        JWT.encode(payload, SECRET_KEY)
    end

    def jwt_decode(token) 
        decoded = JWT.decode(token, SECRET_KEY)[0]
        HashWithIndifferentAccess.new decoded
    end
end