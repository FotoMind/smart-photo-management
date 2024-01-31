import Image from "next/image";

export default function Home() {
  return (
   <main>
    <div>
      <form>
        <label for="uname"> username </label> <br></br>
        <input type="text" id="uname" name="uname"></input> <br></br>
        <label for="passwd"> password </label> <br></br>
        <input type="text" id="passwd" name="passwd"></input> <br></br>
        <button>
          Enter
        </button>
      </form>
    </div>
   </main>
  );
}
