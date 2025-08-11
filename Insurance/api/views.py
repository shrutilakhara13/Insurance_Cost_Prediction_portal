from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import numpy as np
import joblib
import os
from .serializers import InsuranceSerializer

model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'Model', 'InsuranceCostPredictor.pkl')
model = joblib.load(model_path)

@api_view(['POST'])
def predict(request):
    if request.method == 'POST':
        serializer = InsuranceSerializer(data=request.data)
        if serializer.is_valid():
            # Prepare input data for the model
            input_data = tuple(serializer.validated_data.values())
            input_data_as_numpy_array = np.asarray(input_data)
            input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)
            
            # Make prediction
            prediction = model.predict(input_data_reshaped)
            
            # Convert numpy array to Python scalar 
            prediction_value = prediction[0].item()  # item() returns native Python type
            
            # Return response with prediction key so frontend can access data.prediction
            return Response({"prediction": prediction_value})
        else:
            return Response(serializer.errors, status=400)
