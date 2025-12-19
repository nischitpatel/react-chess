const AI_API_URL = "http://localhost:8000/predict-move";

export async function getGmMove(board, turn = "black", history = []) {
  // Build request payload
  const payload = {
    board: board,
    turn: turn,
    // history,
  };

  // Call backend
  const response = await fetch(AI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI request failed: ${errorText}`);
  }

  // Parse response
  const data = await response.json();

  if (data.fromRow==null || data.toRow==null || data.fromCol==null || data.toCol==null) {
    throw new Error("Invalid AI response format");
  }

  return {
    fromRow: data.fromRow,
    fromCol: data.fromCol,
    toRow: data.toRow,
    toCol: data.toCol
  };
}
